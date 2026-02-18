import baseApi from "./base.tsx";
import {Product} from "../Types/Product.tsx";
import {BrandCount, TopBrand} from "../Types/Brand.tsx";
import {GetBrandCountsRequest, SearchParamsRequest} from "../Types/Requests.tsx";

export const searchProducts = async (
  params: SearchParamsRequest = {}
): Promise<Product[]> => {
  const { data }= await baseApi.get("/product/search", { params });
  return data;
};

export const getTopBrands = async (
  q: string
): Promise<TopBrand[]> => {
  const { data } = await baseApi.get("/product/search/top-brands", { params: {q} });
  return data;
};

export const getBrandsCounts = async (params: GetBrandCountsRequest): Promise<BrandCount[]> => {
  const {data} = await baseApi.get("/product/search/count-brands", {params});
  return data;
}