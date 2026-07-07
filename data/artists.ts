export interface Artist {
  name: string;
  url?: string;
  photo?: string;
}

export const artists: Artist[] = [
  { name: "Flash Ikumkani" },
  { name: "Gxarha" },
  {
    name: "Ndlulamthi",
    url: "https://ndlulamthi.umculo.app",
  },
  {
    name: "Mzukhona",
    url: "https://mzukhona.umculo.app",
  },
  { name: "Lordie" },
  {
    name: "Yung Savage QTN",
    url: "https://savage.umculo.app",
  },
];

export const TOTAL_ARTISTS = artists.length;

export function getLiveArtists(): Array<Artist & { url: string }> {
  return artists.filter((artist): artist is Artist & { url: string } =>
    Boolean(artist.url),
  );
}
