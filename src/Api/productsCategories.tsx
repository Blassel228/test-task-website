import {TopBrand} from "../Types/Brand.tsx";
import baseApi from "./base.tsx";
import {CategoryCount} from "../Types/Catagory.tsx";

import {GetCategoryCountsRequest} from "../Types/Requests.tsx";

export const getTopCategories = async (
  q: string
): Promise<TopBrand[]> => {
  const { data } = await baseApi.get("/product-category/top-categories", {
    params: {q} ,
  });
  return data;
};

export const getCategoriesCounts = async (params: GetCategoryCountsRequest): Promise<CategoryCount[]> => {
  const { data } = await baseApi.get("/product-category/categories-count", {params});
  return data;
};
