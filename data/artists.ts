export type ArtistStatus = "live" | "production";

export interface Artist {
  name: string;
  status: ArtistStatus;
  url?: string;
  photo?: string;
}

export const TOTAL_SLOTS = 10;

export const artists: Artist[] = [
  { name: "Flash Ikumkani", status: "production" },
  { name: "Gxarha", status: "production" },
  { name: "Ndlulamthi", status: "production" },
  {
    name: "Mzukhona",
    status: "live",
    url: "https://mzukhona.umculo.app",
  },
  { name: "Lordie", status: "production" },
  {
    name: "Yung Savage QTN",
    status: "live",
    url: "https://savage.umculo.app",
  },
];

export const slotsRemaining = TOTAL_SLOTS - artists.length;
