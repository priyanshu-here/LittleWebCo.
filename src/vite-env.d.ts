/// <reference types="vite/client" />

declare const __SITE_URL__: string

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_KEY?: string
  readonly VITE_SITE_URL?: string
}
