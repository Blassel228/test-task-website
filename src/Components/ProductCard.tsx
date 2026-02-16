import React from "react";
import styled from "styled-components";
import Column from "./Column.tsx";
import {Product} from "../Types/Product.tsx";

const CardContainer = styled(Column)`
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.2);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: contain;
  margin-bottom: 12px;
`;

const ProductName = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #111;
`;

const Brand = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 4px;
`;

const Categories = styled.div`
  font-size: 12px;
  color: #888;
`;

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <CardContainer>
      <ProductImage src={product.image || "/placeholder.png"} alt={product.name} />
      <ProductName>{product.name}</ProductName>
      <Brand>{product.brand?.name || "No Brand"}</Brand>
      <Categories>
        {product.categories?.map((c: any) => c.name).join(", ") || "No Categories"}
      </Categories>
    </CardContainer>
  );
};

export default ProductCard;
