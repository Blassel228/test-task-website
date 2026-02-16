import { supabase } from "./supabaseClient.tsx";
import {Product} from "../Types/Product.tsx";
import {BrandFacet, CategoryFacet} from "../Types/Facets.tsx";

interface SearchParams {
  q?: string;
  brandIds?: number[];
  categoryIds?: number[];
  limit?: number;
  offset?: number;
}

export const searchProducts = async ({
  q,
  brandIds,
  categoryIds,
  limit = 20,
  offset = 0
}: SearchParams): Promise<Product[]> => {
  let query = supabase
    .from("products")
    .select(`*`)
    .range(offset, offset + limit - 1);

  if (q) query = query.ilike("name", `%${q}%`);
  if (brandIds?.length) query = query.in("brand_id", brandIds);
  if (categoryIds?.length) query = query.in("product_categories.category_id", categoryIds);

  const { data, error } = await query;
  console.log("products: ", data)
  if (error) throw error;

  return data;
};

export const getBrandFacets = async ({
  q,
  categoryIds
}: Pick<SearchParams, 'q' | 'categoryIds'>): Promise<BrandFacet[]> => {
  let query = supabase
    .from("products")
    .select("brand_id, brand:brand_id(name), id.count()");

  if (q) query = query.ilike("name", `%${q}%`);
  if (categoryIds?.length) query = query.in("product_categories.category_id", categoryIds);

  const { data, error } = await query.order("count", { ascending: false });
  if (error) throw error;

  return data;
};

export const getCategoryFacets = async ({
  q,
  brandIds
}: Pick<SearchParams, 'q' | 'brandIds'>): Promise<CategoryFacet[]> => {
  let query = supabase
    .from("product_categories")
    .select("category_id, category:category_id(name), product_id.count(), product:product_id(name, brand_id)");

  if (q) query = query.ilike("product.name", `%${q}%`);
  if (brandIds?.length) query = query.in("product.brand_id", brandIds);

  const { data, error } = await query.order("count", { ascending: false });
  if (error) throw error;

  return data;
};


export const searchProductsWithFacets = async (params: SearchParams) => {
  const [products, brands, categories] = await Promise.all([
    searchProducts(params),
    getBrandFacets({ q: params.q, categoryIds: params.categoryIds }),
    getCategoryFacets({ q: params.q, brandIds: params.brandIds })
  ]);
  return {
    products,
    facets: { brands, categories }
  };
};