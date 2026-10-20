import manifest from './gallery.json'

// Public delivery URL only. Never put storage credentials in VITE_* variables.
const galleryBaseUrl = (import.meta.env.VITE_GALLERY_BASE_URL || `${import.meta.env.BASE_URL}images/gallery`).replace(/\/+$/, '')

export const galleryPhotos = manifest.map((photo) => ({
  ...photo,
  imageUrl: `${galleryBaseUrl}/${photo.image}`,
  thumbnailUrl: `${galleryBaseUrl}/${photo.thumbnail}`,
}))

export type GalleryPhoto = (typeof galleryPhotos)[number]
