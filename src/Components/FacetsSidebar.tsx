import React from "react";
import styled from "styled-components";
import { BrandFacet, CategoryFacet } from "../Types/Facets.tsx";
import { FacetCheckbox } from "./FacetCheckbox";

interface Props {
  brands: BrandFacet[];
  categories: CategoryFacet[];
  selectedBrands: number[];
  selectedCategories: number[];
  onToggleBrand: (id: number) => void;
  onToggleCategory: (id: number) => void;
}

const SidebarContainer = styled.div`
  width: 280px;
  padding: 1.5rem;
  background: #fff;
  border-right: 1px solid #eee;
  height: calc(100vh - 60px);
  overflow-y: auto;
  position: sticky;
  top: 60px;
  flex-shrink: 0;
`;

const Section = styled.div`
  margin-bottom: 1.8rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #f0f0f0;
  color: #333;
`;

const EmptyState = styled.div`
  color: #999;
  font-size: 0.9rem;
  padding: 8px 0;
  font-style: italic;
`;

const FacetsSidebar: React.FC<Props> = ({
  brands,
  categories,
  selectedBrands,
  selectedCategories,
  onToggleBrand,
  onToggleCategory
}) => {
  const validBrands = brands.filter(b => b.brand?.name);
  const validCategories = categories.filter(c => c.category?.name);

  return (
    <SidebarContainer>
      <Section>
        <SectionTitle>Brands</SectionTitle>
        {validBrands.length > 0 ? (
          validBrands.map(brand => (
            <FacetCheckbox
              key={brand.brand_id}
              label={brand.brand.name}
              count={brand.count}
              checked={selectedBrands.includes(brand.brand_id)}
              onChange={() => onToggleBrand(brand.brand_id)}
            />
          ))
        ) : (
          <EmptyState>No brands</EmptyState>
        )}
      </Section>

      <Section>
        <SectionTitle>Catagories</SectionTitle>
        {validCategories.length > 0 ? (
          validCategories.map(category => (
            <FacetCheckbox
              key={category.category_id}
              label={category.category.name}
              count={category.count}
              checked={selectedCategories.includes(category.category_id)}
              onChange={() => onToggleCategory(category.category_id)}
            />
          ))
        ) : (
          <EmptyState>No categories</EmptyState>
        )}
      </Section>
    </SidebarContainer>
  );
};

export default FacetsSidebar;