/**
 * Founder profiles.
 *
 * PLACEHOLDERS — replace before launch:
 *  - `photo`: add the portrait file to /public/team/ and set `{ src: '/team/<file>.jpg', alt: '…', width, height }`.
 *    No founder photos are present in the project yet, so a monogram tile is shown instead.
 *  - `instagram`: no handles are recorded in the project yet. Set `handle` (without @) and the full
 *    profile `url`. Nothing is rendered publicly until both are filled in.
 *  - `bio` and `skills` are optional; empty values are hidden.
 */
export interface Founder {
  id: string
  name: string
  role: string
  initials: string
  bio: string
  skills: string[]
  photo: { src: string; alt: string; width: number; height: number } | null
  instagram: { handle: string; url: string }
}

export const founders: Founder[] = [
  {
    id: 'priyanshu-pal',
    name: 'Priyanshu Pal',
    role: 'Founder',
    initials: 'PP',
    bio: '',
    skills: [],
    photo: { src: '/team/priyanshu-pal.jpg', alt: 'Portrait of Priyanshu Pal, Founder of Little Web Co.', width: 640, height: 800 },
    instagram: { handle: 'Priyanshu', url: 'https://www.instagram.com/btw.arush' }, // PLACEHOLDER: e.g. { handle: 'priyanshu', url: 'https://www.instagram.com/btw.arush' }
  },
  {
    id: 'vanshika-sachan',
    name: 'Vanshika Sachan',
    role: 'Co-Founder',
    initials: 'VS',
    bio: 'QA professional focused on software quality, API testing, automation workflows, and reliable digital products.',
    skills: [],
    photo: { src: '/team/vanshika-sachan.jpg', alt: 'Portrait of Vanshika Sachan, Co-Founder of Little Web Co.', width: 640, height: 578 }, // PLACEHOLDER: e.g. { src: '/team/vanshika-sachan.jpg', alt: 'Portrait of Vanshika Sachan, Co-Founder of Little Web Company', width: 800, height: 800 }
    instagram: { handle: 'Vanshika', url: 'https://www.instagram.com/vanshika_454' }, // PLACEHOLDER: e.g. { handle: 'vanshika', url: 'https://www.instagram.com/vanshika' }
  },
]
