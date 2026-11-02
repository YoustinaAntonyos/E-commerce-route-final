import {
  IconProgressBolt,
  IconReportMedical,
  IconShirtSport,
  IconTag,
} from "@tabler/icons-react";

export function getCategoryIcon(categoryName: string) {
  const normalizedName = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, " ");
  const nameParts = normalizedName.split(" ");
  if (nameParts.includes("electronic") || nameParts.includes("electronics")) {
    return IconProgressBolt;
  }
  if (nameParts.includes("women") || nameParts.includes("woman")) {
    return IconShirtSport;
  }
  if (nameParts.includes("men") || nameParts.includes("man")) {
    return IconShirtSport;
  }
  if (nameParts.includes("beauty") || nameParts.includes("health")) {
    return IconReportMedical;
  }
  return IconTag;
}

export function getRequestedCategoryNames(categories: string[]) {
  const requestedNames = [
    { match: ["electronics", "electronic"], label: "Electronics" },
    { match: ["women", "woman"], label: "Women's Fashion" },
    { match: ["men", "man"], label: "Men's Fashion" },
    { match: ["beauty", "health"], label: "Beauty & Health" },
  ];

  return requestedNames
    .map(({ match, label }) => {
      const actualName = categories.find((category) => {
        const categoryWords = category.toLowerCase().replace(/[^a-z0-9]+/g, " ").split(" ");
        return match.some((term) => categoryWords.includes(term));
      });
      return actualName ? { label, actualName } : null;
    })
    .filter((entry): entry is { label: string; actualName: string } => entry !== null);
}
