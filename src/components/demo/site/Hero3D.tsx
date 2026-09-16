import { useEffect, useRef } from 'react'
import type * as THREE from 'three'
import type { ThreeDKind } from '@/lib/demo/types'

/**
 * Lazy-loaded WebGL hero. This module is only ever imported when the level is
 * Professional AND the industry is one where a 3D scene depicts something real,
 * so Three.js never reaches the main bundle.
 *
 * It renders on demand: the loop stops whenever the canvas leaves the viewport
 * or the tab is hidden, and it never starts at all under reduced motion.
 */
export default function Hero3D({ kind, accent, ink }: { kind: Exclude<ThreeDKind, null>; accent: string; ink: string }) {
  const mount = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mount.current
    if (!el) return
    let disposed = false
    let cleanup: (() => void) | undefined

    void (async () => {
      const THREE = await import('three')
      if (disposed || !el) return

      let renderer: THREE.WebGLRenderer
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
      } catch {
        return // no WebGL: the caller's 2D fallback stays on screen
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(el.clientWidth, el.clientHeight)
      el.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(40, el.clientWidth / el.clientHeight, 0.1, 100)
      camera.position.set(0, 1.6, 9)
      camera.lookAt(0, 0.2, 0)

      const accentColor = new THREE.Color(accent)
      const inkColor = new THREE.Color(ink)

      scene.add(new THREE.AmbientLight(0xffffff, 1.1))
      const key = new THREE.DirectionalLight(0xffffff, 1.5)
      key.position.set(4, 7, 5)
      scene.add(key)
      const rim = new THREE.DirectionalLight(accentColor, 1.1)
      rim.position.set(-6, 2, -4)
      scene.add(rim)

      const group = new THREE.Group()
      scene.add(group)
      const disposables: Array<{ dispose: () => void }> = []

      const solid = (color: THREE.Color, metal = 0.1, rough = 0.55) => {
        const m = new THREE.MeshStandardMaterial({ color, metalness: metal, roughness: rough })
        disposables.push(m)
        return m
      }

      if (kind === 'structure') {
        // A cluster of extruded volumes: reads as architecture / property.
        const heights = [2.4, 3.6, 1.8, 4.4, 2.8, 2.0]
        heights.forEach((h, i) => {
          const g = new THREE.BoxGeometry(0.95, h, 0.95)
          disposables.push(g)
          const mesh = new THREE.Mesh(g, solid(i % 3 === 0 ? accentColor : inkColor.clone().lerp(new THREE.Color(0xffffff), 0.72)))
          mesh.position.set((i % 3) * 1.25 - 1.25, h / 2 - 1.2, Math.floor(i / 3) * 1.3 - 0.65)
          group.add(mesh)
        })
        const pg = new THREE.BoxGeometry(6.4, 0.18, 4.2)
        disposables.push(pg)
        const plate = new THREE.Mesh(pg, solid(inkColor.clone().lerp(new THREE.Color(0xffffff), 0.86), 0, 0.9))
        plate.position.y = -1.3
        group.add(plate)
      } else if (kind === 'vehicle') {
        // Abstract body + cabin + wheels.
        const body = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.9, 2), solid(accentColor, 0.45, 0.3))
        body.position.y = 0.15
        group.add(body)
        const cabin = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.85, 1.75), solid(inkColor.clone().lerp(new THREE.Color(0xffffff), 0.3), 0.3, 0.2))
        cabin.position.set(-0.15, 0.9, 0)
        group.add(cabin)
        const wheelGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.36, 26)
        disposables.push(wheelGeo)
        ;[[-1.5, 1], [1.5, 1], [-1.5, -1], [1.5, -1]].forEach(([x, z]) => {
          const w = new THREE.Mesh(wheelGeo, solid(new THREE.Color(0x1b1b1e), 0.2, 0.7))
          w.rotation.x = Math.PI / 2
          w.position.set(x, -0.42, z)
          group.add(w)
        })
      } else if (kind === 'product') {
        // A small float of product-like volumes.
        const shapes: THREE.BufferGeometry[] = [
          new THREE.BoxGeometry(1.5, 1.5, 1.5),
          new THREE.CylinderGeometry(0.75, 0.75, 1.7, 30),
          new THREE.IcosahedronGeometry(0.95, 0),
        ]
        shapes.forEach((g, i) => {
          disposables.push(g)
          const mesh = new THREE.Mesh(g, solid(i === 1 ? accentColor : inkColor.clone().lerp(new THREE.Color(0xffffff), 0.7), 0.25, 0.35))
          mesh.position.set((i - 1) * 2.3, i === 1 ? 0.35 : -0.1, i === 2 ? -0.9 : 0)
          group.add(mesh)
        })
      } else {
        // network: nodes joined by lines.
        const nodeGeo = new THREE.SphereGeometry(0.2, 18, 18)
        disposables.push(nodeGeo)
        const pts: THREE.Vector3[] = []
        for (let i = 0; i < 16; i++) {
          const a = (i / 16) * Math.PI * 2
          const r = 2.1 + (i % 3) * 0.65
          const v = new THREE.Vector3(Math.cos(a) * r, Math.sin(a * 1.6) * 1.15, Math.sin(a) * r * 0.55)
          pts.push(v)
          const n = new THREE.Mesh(nodeGeo, solid(i % 4 === 0 ? accentColor : inkColor.clone().lerp(new THREE.Color(0xffffff), 0.55), 0.3, 0.3))
          n.position.copy(v)
          group.add(n)
        }
        const lineGeo = new THREE.BufferGeometry().setFromPoints([...pts, pts[0]])
        disposables.push(lineGeo)
        const lineMat = new THREE.LineBasicMaterial({ color: accentColor, transparent: true, opacity: 0.55 })
        disposables.push(lineMat)
        group.add(new THREE.Line(lineGeo, lineMat))
      }

      // Pointer parallax, damped.
      let targetX = 0
      let targetY = 0
      let curX = 0
      let curY = 0
      const onPointer = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        targetX = ((e.clientX - r.left) / r.width - 0.5) * 0.6
        targetY = ((e.clientY - r.top) / r.height - 0.5) * 0.35
      }
      el.addEventListener('pointermove', onPointer, { passive: true })

      let raf = 0
      let running = false
      const clock = new THREE.Clock()
      const frame = () => {
        if (!running) return
        const t = clock.getElapsedTime()
        curX += (targetX - curX) * 0.05
        curY += (targetY - curY) * 0.05
        group.rotation.y = t * 0.16 + curX
        group.rotation.x = curY * 0.5
        group.position.y = Math.sin(t * 0.7) * 0.07
        renderer.render(scene, camera)
        raf = requestAnimationFrame(frame)
      }
      const start = () => {
        if (running) return
        running = true
        clock.start()
        raf = requestAnimationFrame(frame)
      }
      const stop = () => {
        running = false
        cancelAnimationFrame(raf)
      }

      // Only render while visible, and never while the tab is in the background.
      const io = new IntersectionObserver(([entry]) => (entry.isIntersecting && !document.hidden ? start() : stop()), { threshold: 0.05 })
      io.observe(el)
      const onVisibility = () => (document.hidden ? stop() : io.takeRecords(), document.hidden ? stop() : start())
      document.addEventListener('visibilitychange', onVisibility)

      const onResize = () => {
        if (!el.clientWidth) return
        camera.aspect = el.clientWidth / el.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(el.clientWidth, el.clientHeight)
        renderer.render(scene, camera)
      }
      const ro = new ResizeObserver(onResize)
      ro.observe(el)
      renderer.render(scene, camera)

      cleanup = () => {
        stop()
        io.disconnect()
        ro.disconnect()
        document.removeEventListener('visibilitychange', onVisibility)
        el.removeEventListener('pointermove', onPointer)
        group.traverse((o) => {
          const mesh = o as THREE.Mesh
          if (mesh.geometry) mesh.geometry.dispose()
        })
        disposables.forEach((d) => d.dispose())
        renderer.dispose()
        if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement)
      }
    })()

    return () => {
      disposed = true
      cleanup?.()
    }
  }, [kind, accent, ink])

  return <div ref={mount} className="absolute inset-0" aria-hidden />
}
