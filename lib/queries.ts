// Semua sertifikasi
export const certificatesQuery = `*[_type == "certificates"] | order(status asc) {
  _id, name, issuer, field, status, progress, year, image, credentialUrl
}`;

// Semua proyek
export const projectsQuery = `*[_type == "projects"] | order(date desc) {
  _id, title, slug, description, category, tools, thumbnail, blogUrl, content, date, featured
}`;

// Single project by slug
export const projectBySlugQuery = `*[_type == "projects" && slug.current == $slug][0] {
  _id, title, slug, description, category, tools, thumbnail, blogUrl, content, date, featured
}`;

// Semua konten YouTube
export const youtubeQuery = `*[_type == "youtubeContent"] | order(publishedAt desc) {
  _id, title, youtubeUrl, description, category, publishedAt
}`;
