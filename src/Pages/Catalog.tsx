import React, {useEffect} from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import Loading from "../Components/Loading.tsx";
import {useSearchProductsWithFacets} from "../Hooks/useSearchProductsWithFacets.tsx";

const CatalogContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
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
  const [searchParams] = useSearchParams();
  const q: string | undefined = searchParams.get("q") || undefined;

  const { products, isLoading, isError } = useSearchProductsWithFacets(q);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorElement>Error during products loading. Try again later.</ErrorElement>;
  if (!products.length) return <EmptyElement>No products found.</EmptyElement>;
  return (
    <CatalogContainer>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </CatalogContainer>
  );
};

export default CatalogPage;
