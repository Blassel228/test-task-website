import { useQuery } from "@tanstack/react-query";
import {
  getBrandsCounts,
  getTopBrands,
  searchProducts,
} from "../Api/products";
import {
  getCategoriesCounts,
  getTopCategories,
} from "../Api/productsCategories";
import {BrandCount, TopBrand} from "../Types/Brand";
import { CategoryCount, TopCategory } from "../Types/Catagory";
import {
  GetBrandCountsRequest,
  GetCategoryCountsRequest,
  SearchParamsRequest,
} from "../Types/Requests";
import {SearchProductsResponse} from "../Types/Responses.tsx";

export const useSearchProducts = (params: SearchParamsRequest) => {
  const { data, isLoading, isError } = useQuery<SearchProductsResponse>({
    queryKey: ["products", params],
    queryFn: async () => await searchProducts(params),
  });
  const total = data?.total || 100;
  const products = data?.products || data || [];

  return {
    products,
    total,
    isLoading,
    isError,
  };
};


export const useTopBrands = (q: string) => {
  const { data, isLoading, isError } = useQuery<TopBrand[]>({
    queryKey: ["topBrands", q],
    queryFn: () => getTopBrands(q),
    enabled: !!q,
    staleTime: 5 * 60 * 1000,
  });

  return { topBrands: data || [], isLoading, isError };
};

export const useTopCategories = (q: string) => {
  const { data, isLoading, isError } = useQuery<TopCategory[]>({
    queryKey: ["topCategories", q],
    queryFn: () => getTopCategories(q),
    enabled: !!q,
    staleTime: 5 * 60 * 1000,
  });

  return { topCategories: data || [], isLoading, isError };
};

export const useGetCategoryCounts = (params: GetCategoryCountsRequest) => {
  const { data, isLoading, isError } = useQuery<CategoryCount[]>({
    queryKey: ["categoryCounts", params],
    queryFn: () => getCategoriesCounts(params),
    staleTime: 5 * 60 * 1000,
  });

  return { categoryCounts: data || [], isLoading, isError };
};

export const useGetBrandsCounts = (params: GetBrandCountsRequest) => {
  const { data, isLoading, isError } = useQuery<BrandCount[]>({
    queryKey: ["brandCounts", params],
    queryFn: () => getBrandsCounts(params),
    staleTime: 5 * 60 * 1000,
  });

  return { brandsCounts: data || [], isLoading, isError };
};