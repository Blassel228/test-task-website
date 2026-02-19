import React from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import Loading from "./Loading";
import {Product} from "../Types/Product.tsx";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;  
  align-items: center;      
  width: 100%;
  height: 100%;
  min-height: 200px;
`

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
  grid-column: 1 / -1;
`;

const EmptyElement = styled.div`
  padding: 20px;
  color: #64748b;
  background: #f1f5f9;
  border-radius: 6px;
  text-align: center;
  grid-column: 1 / -1;
`;

interface Props {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
}

const ProductsList: React.FC<Props> = ({
  products,
  isLoading,
  isError,
}) => {
  if (isLoading){
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  if (isError) {
    return (
      <CatalogContainer>
        <ErrorElement>
          Error during products loading. Try again later.
        </ErrorElement>
      </CatalogContainer>
    );
  }

  if (!products.length && !isLoading) {
    return (
      <CatalogContainer>
        <EmptyElement>No products found.</EmptyElement>
      </CatalogContainer>
    );
  }

  return (
    <CatalogContainer>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </CatalogContainer>
  );
};

export default ProductsList;