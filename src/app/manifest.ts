import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cut And Sew Tribe",
    short_name: "CAST",
    description:
      "Online fashion school for sewing, dressmaking, pattern drafting, and fashion business training.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#661093",
    icons: [
      {
        src: "/brand/cast-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}