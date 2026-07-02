import type { MetadataRoute } from "next";
import { manifestConfig } from "@/lib/seo/manifest-config";

export default function manifest(): MetadataRoute.Manifest {
  return manifestConfig;
}
