import { galleryPhotos } from './gallery'

function photo(id: string) {
  const entry = galleryPhotos.find((item) => item.id === id)
  if (!entry) throw new Error(`Missing site photo: ${id}`)

  return {
    src: entry.imageUrl,
    alt: entry.title,
    width: entry.width,
    height: entry.height,
  }
}

// Explicit placements share the gallery's local / future public-media URL resolver.
// The homepage hero remains the original asset, outside this selection.
export const sitePhotos = {
  homeLiving: photo('golden-days-29'),
  homeBedroom: photo('golden-days-41'),
  homeVisit: photo('golden-days-21'),
  about: photo('golden-days-17'),
  services: photo('golden-days-36'),
  admissions: photo('golden-days-07'),
  staff: photo('golden-days-08'),
  testimonials: photo('golden-days-28'),
}
