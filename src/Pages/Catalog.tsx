import React from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import Loading from "../Components/Loading.tsx";
import {useSearchProductsWithFacets} from "../Hooks/useSearchProductsWithFacets.tsx";
import Row from "../Components/Row.tsx";
import FacetsSidebar from "../Components/FacetsSidebar.tsx";

const CatalogContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  width: 100%;
  gap: 16px;
  padding: 20px;
  background-color: #f7f7f7;
`;

const ErrorElement = styled.div`
  padding: 20px;
  color: #dc2626;
  background: #fee2e2;
  border-radius: 6px;
  text-align: center;
`;

const EmptyElement = styled.div`
  padding: 20px;
  color: #64748b;
  background: #f1f5f9;
  border-radius: 6px;
  text-align: center;
`;

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get('q') || '';
  const brandIds = searchParams.get('brandIds')?.split(',').map(Number) || [];
  const categoryIds = searchParams.get('categoryIds')?.split(',').map(Number) || [];
  const offset = Number(searchParams.get('offset') || 0);

  const { products, facets, isLoading, isError } = useSearchProductsWithFacets(
    q,
    brandIds,
    categoryIds,
    100,
    offset
  );

  const updateFilters = (newParams: Record<string, string | number | string[]>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.length > 0 ? params.set(key, value.join(',')) : params.delete(key);
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
      ? brandIds.filter(id => id !== brandId)
      : [...brandIds, brandId];
    updateFilters({ brandIds: newBrands });
  };

  const toggleCategory = (categoryId: number) => {
    const newCategories = categoryIds.includes(categoryId)
      ? categoryIds.filter(id => id !== categoryId)
      : [...categoryIds, categoryId];
    updateFilters({ categoryIds: newCategories });
  };


  if (isLoading) return <Loading />;
  if (isError) return <ErrorElement>Error during products loading. Try again later.</ErrorElement>;
  if (!products.length) return <EmptyElement>No products found.</EmptyElement>;
  return (
    <Row>
      <FacetsSidebar
        brands={facets?.brands || []}
        categories={facets?.categories || []}
        selectedBrands={brandIds}
        selectedCategories={categoryIds}
        onToggleBrand={toggleBrand}
        onToggleCategory={toggleCategory}
      />
      <CatalogContainer>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </CatalogContainer>
    </Row>
  );
};

export default CatalogPage;
