import {Product} from "./Product.tsx";

export interface SearchProductsResponse {
  products: Product[];
  total: number;
}