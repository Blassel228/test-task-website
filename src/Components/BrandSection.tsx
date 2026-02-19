import React, { useMemo } from "react";
import FacetSection, { FacetItem } from "./FacetSection.tsx";
import { TopBrand } from "..//Types/Brand";
import { BrandCount } from "../Types/Brand";

interface Props {
  brands: TopBrand[];
  brandCounts: BrandCount[];
  selectedBrands: number[];
  isLoading?: boolean;
  onToggleBrand: (id: number) => void;
}

export const BrandSection: React.FC<Props> = ({
  brands,
  brandCounts,
  selectedBrands,
  isLoading = false,
  onToggleBrand,
}) => {

  const countsMap = new Map(
    brandCounts.map(c => [c.brand_id, c.count])
  );

  const items: FacetItem[] = brands
    .map(b => ({
      id: b.brand_id,
      label: b.brand_name ?? "Unknown",
      count: countsMap.get(b.brand_id) ?? 0,
    }))
    .filter(item => item.label);

  return (
    <FacetSection
      title="Brands"
      items={items}
      selectedIds={selectedBrands}
      isLoading={isLoading}
      onToggle={onToggleBrand}
    />
  );
};