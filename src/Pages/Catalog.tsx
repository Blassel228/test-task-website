import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useSearchProducts,
  useTopBrands,
  useTopCategories,
  useGetCategoryCounts,
  useGetBrandsCounts,
} from "../Hooks/useFacets.tsx";
import Row from "../Components/Row";
import FacetsSidebar from "../Components/FacetsSidebar.tsx";
import styled from "styled-components";
import ProductsList from "../Components/ProductsList.tsx";

const CatalogContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  width: 100%;
  gap: 16px;
  padding: 20px;
  background-color: #f7f7f7;
`;

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") || "";
  const brandIds = searchParams.get("brandIds")?.split(",").map(Number) || [];
  const categoryIds = searchParams.get("categoryIds")?.split(",").map(Number) || [];

  const apiParams = useMemo(
    () => ({ q, brand_ids: brandIds, category_ids: categoryIds }),
    [q, brandIds, categoryIds]
  );

  const { topBrands, isLoading: areBrandsLoading } = useTopBrands(q);
  const { topCategories, isLoading: areCategoriesLoading } = useTopCategories(q);

  const topBrandIds = useMemo(() => topBrands.map((b) => b.brand_id), [topBrands]);
  const topCategoryIds = useMemo(() => topCategories.map((c) => c.category_id), [topCategories]);

  const brandCountsParams = useMemo(
    () => ({ q, brand_ids: topBrandIds, category_ids: categoryIds }),
    [q, topBrandIds, categoryIds]
  );

  const categoryCountsParams = useMemo(
    () => ({ q, brand_ids: brandIds, category_ids: topCategoryIds }),
    [q, brandIds, topCategoryIds]
  );

  const { products, isLoading: areProductsLoading, isError: isProductsError } = useSearchProducts(apiParams);
  const { categoryCounts, isLoading: categoryCountsLoading } = useGetCategoryCounts(categoryCountsParams,  { enabled: topCategoryIds.length > 0 } );
  const { brandsCounts, isLoading: brandCountsLoading } = useGetBrandsCounts(brandCountsParams);

  const isGlobalLoading = areProductsLoading || categoryCountsLoading || brandCountsLoading || areBrandsLoading || areCategoriesLoading;
  
  const isGlobalError = isProductsError; 

  const updateFilters = (newParams: Record<string, any>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.length > 0 ? params.set(key, value.join(",")) : params.delete(key);
      } else if (value) {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });
    setSearchParams(params, { replace: true });
  };

  const toggleBrand = (brandId: number) => {
    const newBrands = brandIds.includes(brandId)
      ? brandIds.filter((id) => id !== brandId)
      : [...brandIds, brandId];
    updateFilters({ brandIds: newBrands });
  };

  const toggleCategory = (categoryId: number) => {
    const newCategories = categoryIds.includes(categoryId)
      ? categoryIds.filter((id) => id !== categoryId)
      : [...categoryIds, categoryId];
    updateFilters({ categoryIds: newCategories });
  };

  return (
    <Row>
      <FacetsSidebar
        brands={topBrands}
        brandCounts={brandsCounts}
        categories={topCategories}
        categoryCounts={categoryCounts}
        selectedBrands={brandIds}
        selectedCategories={categoryIds}
        onToggleBrand={toggleBrand}
        onToggleCategory={toggleCategory}
      />

       <ProductsList products={products} isLoading={isGlobalLoading} isError={isGlobalError} />
    </Row>
  );
};

export default CatalogPage;