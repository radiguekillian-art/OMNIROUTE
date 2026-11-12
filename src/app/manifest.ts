import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FADIYE",
    short_name: "FADIYE",
    description: "L’élégance dans le détail.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f5f2",
    theme_color: "#090909",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
