import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://mshydropro.nl",
      lastModified: new Date(),
    },
    {
      url: "https://mshydropro.nl/pl",
      lastModified: new Date(),
    },
    {
      url: "https://mshydropro.nl/en",
      lastModified: new Date(),
    },
  ];
}
