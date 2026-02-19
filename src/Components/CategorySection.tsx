import React, { useMemo } from "react";
import FacetSection, { FacetItem } from "./FacetSection.tsx";
import { TopCategory } from "../Types/Catagory";
import { CategoryCount } from "../Types/Catagory";

interface Props {
  categories: TopCategory[];
  categoryCounts: CategoryCount[];
  selectedCategories: number[];
  isLoading?: boolean;
  onToggleCategory: (id: number) => void;
}

export const CategorySection: React.FC<Props> = ({
  categories,
  categoryCounts,
  selectedCategories,
  isLoading = false,
  onToggleCategory,
}) => {
  const countsMap = new Map(
    categoryCounts.map((c) => [c.category_id, c.count])
  );

  const items: FacetItem[] = categories
    .map((c) => ({
      id: c.category_id,
      label: c.category_name || "Unknown",
      count: countsMap.get(c.category_id) || 0,
    }))
    .filter((i) => i.label);

  return (
    <FacetSection
      title="Categories"
      items={items}
      selectedIds={selectedCategories}
      isLoading={isLoading}
      onToggle={onToggleCategory}
    />
  );
};