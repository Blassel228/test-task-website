import React from "react";
import styled from "styled-components";
import { BrandSection, CategorySection } from "./BrandSection";
import { TopBrand } from "../Types/Brand";
import { TopCategory } from "../Types/Catagory";
import { BrandCount } from "../Types/Brand";
import { CategoryCount } from "../Types/Catagory";

interface Props {
  brands: TopBrand[];
  brandCounts: BrandCount[];
  categories: TopCategory[];
  categoryCounts: CategoryCount[];
  selectedBrands: number[];
  selectedCategories: number[];
  isLoadingBrands?: boolean;
  isLoadingCategories?: boolean;
  onToggleBrand: (id: number) => void;
  onToggleCategory: (id: number) => void;
}

const SidebarContainer = styled.aside`
  width: 280px;
  padding: 1.5rem;
  background: #fff;
  border-right: 1px solid #eee;
  height: calc(100vh - 60px);
  overflow-y: auto;
  position: sticky;
  top: 60px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    position: static;
    height: auto;
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #eee;
  }
`;

const FacetsSidebar: React.FC<Props> = ({
  brands,
  brandCounts,
  categories,
  categoryCounts,
  selectedBrands,
  selectedCategories,
  isLoadingBrands = false,
  isLoadingCategories = false,
  onToggleBrand,
  onToggleCategory,
}) => {
  return (
    <SidebarContainer aria-label="Product Filters">
      <BrandSection
        brands={brands}
        brandCounts={brandCounts}
        selectedBrands={selectedBrands}
        isLoading={isLoadingBrands}
        onToggleBrand={onToggleBrand}
      />

      <CategorySection
        categories={categories}
        categoryCounts={categoryCounts}
        selectedCategories={selectedCategories}
        isLoading={isLoadingCategories}
        onToggleCategory={onToggleCategory}
      />
    </SidebarContainer>
  );
};

export default FacetsSidebar;