import { GEOAPIFY_API_KEY } from "@env";
export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=400&height=400&center=lonlat:${lng},${lat}&zoom=14&apiKey=${GEOAPIFY_API_KEY}`;
  return imagePreviewUrl;
}
