const Bingo_API_key =
  "Ar7ZdRvRZ5B7fK4bN0-BRMth9o13Nu_uL7SkpollXmWLts14XNAljlGTnGORrpqI";
export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://bing.com/maps/default.aspx?cp=${lat},${lng}
  &lvl=14&style=r&key=${Bingo_API_key}&st=wt|fc:FF0000;lbc:00FF00_rd|fc:0000FF_g|landColor:FFFFFF`;
  return imagePreviewUrl;
}
