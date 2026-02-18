import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { FacetCheckbox } from "./FacetCheckbox";
import { TopBrand } from "../Types/Brand";
import { BrandCount } from "../Types/Brand";
import {CategoryCount, TopCategory} from "../Types/Catagory.tsx";

interface Props {
  brands: TopBrand[];
  brandCounts: BrandCount[];
  selectedBrands: number[];
  isLoading?: boolean;
  onToggleBrand: (id: number) => void;
}


const Section = styled.div`
  margin-bottom: 1.8rem;
  &:last-child { margin-bottom: 0; }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
  margin-bottom: 12px;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #f0f0f0;
  color: #333;
  flex-grow: 1;
`;

const ToggleIcon = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})<{ isOpen: boolean }>`
  font-size: 1.2rem;
  color: #666;
  transform: rotate(${({ isOpen }) => (isOpen ? "180deg" : "0deg")});
  transition: transform 0.2s ease;
`;

const ItemsList = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 8px;
`;

const EmptyState = styled.div`
  color: #999;
  font-size: 0.9rem;
  padding: 8px 0;
  font-style: italic;
`;

const SkeletonItem = styled.div`
  height: 24px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: loading 1.5s infinite;

  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

export const BrandSection: React.FC<Props> = ({
  brands,
  brandCounts,
  selectedBrands,
  isLoading = false,
  onToggleBrand,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const mergedBrands = useMemo(() => {
    const countsMap = new Map(brandCounts.map((c) => [c.brand_id, c.count]));

    return brands
      .map((brand) => ({
        id: brand.brand_id,
        label: brand.brand_name || "Unknown",
        count: countsMap.get(brand.brand_id) || 0,
      }))
      .filter((b) => b.label && b.label.trim() !== "");
  }, [brands, brandCounts]);

  return (
    <Section>
      <SectionHeader onClick={() => setIsOpen(!isOpen)} role="button" tabIndex={0}>
        <SectionTitle>Brands</SectionTitle>
        <ToggleIcon isOpen={isOpen}>▼</ToggleIcon>
      </SectionHeader>

      <ItemsList isOpen={isOpen}>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonItem key={i} />)
        ) : mergedBrands.length > 0 ? (
          mergedBrands.map((brand) => (
            <FacetCheckbox
              key={brand.id}
              label={brand.label}
              count={brand.count}
              checked={selectedBrands.includes(brand.id)}
              onChange={() => onToggleBrand(brand.id)}
            />
          ))
        ) : (
          <EmptyState>No brands</EmptyState>
        )}
      </ItemsList>
    </Section>
  );
};

interface PropsCool {
  categories: TopCategory[];
  categoryCounts: CategoryCount[];
  selectedCategories: number[];
  isLoading?: boolean;
  onToggleCategory: (id: number) => void;
}

export const CategorySection: React.FC<PropsCool> = ({
  categories,
  categoryCounts,
  selectedCategories,
  isLoading = false,
  onToggleCategory,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const mergedCategories = useMemo(() => {
    const countsMap = new Map(categoryCounts.map((c) => [c.category_id, c.count]));

    return categories
      .map((category) => ({
        id: category.category_id,
        label: category.category_name || "Unknown",
        count: countsMap.get(category.category_id) || 0,
      }))
      .filter((c) => c.label && c.label.trim() !== "");
  }, [categories, categoryCounts]);

  return (
    <Section>
      <SectionHeader onClick={() => setIsOpen(!isOpen)} role="button" tabIndex={0}>
        <SectionTitle>Categories</SectionTitle>
        <ToggleIcon isOpen={isOpen}>▼</ToggleIcon>
      </SectionHeader>

      <ItemsList isOpen={isOpen}>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonItem key={i} />)
        ) : mergedCategories.length > 0 ? (
          mergedCategories.map((category) => (
            <FacetCheckbox
              key={category.id}
              label={category.label}
              count={category.count}
              checked={selectedCategories.includes(category.id)}
              onChange={() => onToggleCategory(category.id)}
            />
          ))
        ) : (
          <EmptyState>No categories</EmptyState>
        )}
      </ItemsList>
    </Section>
  );
};

