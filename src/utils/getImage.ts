export function getImageUrl(multimedia: any[] = []): string {
  const img = multimedia.find((m) => m.type === "image");
  return img ? `https://static01.nyt.com/${img.url}` : "/placeholder.jpg";
}
