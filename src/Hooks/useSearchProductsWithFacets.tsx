import { useQuery } from "@tanstack/react-query";
import {getTopBrands, getTopCategories, searchProducts, searchProductsWithFacets} from "../Lib/product.tsx";
import {Product} from "../Types/Product.tsx";
import {BrandFacet, CategoryFacet} from "../Types/Facets.tsx";

export interface SearchResponse {
  products: Product[];
  facets: {
    brands: BrandFacet[];
    categories: CategoryFacet[];
  };
}

export const useSearchProductsWithFacets = (
  q: string,
  brandIds: number[],
  categoryIds?: number[],
  limit?: number,
  offset?: number
) => {
  const { data, isLoading, isError } = useQuery<SearchResponse, Error>({
    queryKey: ["products", q, brandIds, categoryIds, offset],
    queryFn: () => searchProductsWithFacets({ q, brandIds, categoryIds, limit, offset }),
    placeholderData: (prev) => prev,
    keepPreviousData: true
  });

  return {
    products: data?.products || [],
    facets: data?.facets,
    isLoading,
    isError
  };
};
