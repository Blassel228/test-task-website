import {Product} from "./Product.tsx";

export interface SearchProductsResponse {
  items: Product[];
  total: number;
}