import { supabase } from "./supabaseClient.tsx";
import { Product } from "../Types/Product.tsx";
import { BrandFacet, CategoryFacet } from "../Types/Facets.tsx";

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
  let filteredProductIds: string[] = [];

  if (categoryIds?.length) {
    const { data: pcs, error } = await supabase
      .from("product_categories")
      .select("product_id")
      .in("category_id", categoryIds);
    if (error) throw error;
    filteredProductIds = pcs.map(pc => pc.product_id);
    if (filteredProductIds.length === 0) return [];
  }

  let query = supabase
    .from("products")
    .select("*")
    .range(offset, offset + limit - 1);

  if (q) query = query.ilike("name", `%${q}%`);
  if (brandIds?.length) query = query.in("brand_id", brandIds);
  if (filteredProductIds.length) query = query.in("id", filteredProductIds);

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
};


export const getBrandFacets = async ({
  q,
  categoryIds
}: Pick<SearchParams, "q" | "categoryIds">): Promise<BrandFacet[]> => {
  let filteredProductIds: string[] = [];
  if (categoryIds?.length) {
    const { data: pcs, error } = await supabase
      .from("product_categories")
      .select("product_id")
      .in("category_id", categoryIds);
    if (error) throw error;
    filteredProductIds = pcs.map(pc => pc.product_id);
  }

  let productsQuery = supabase
    .from("products")
    .select("id, brand_id")
    .ilike("name", `%${q || ""}%`);

  if (filteredProductIds.length) productsQuery = productsQuery.in("id", filteredProductIds);

  const { data: filteredProducts, error: productsError } = await productsQuery;
  if (productsError) throw productsError;

  const { data: allBrands, error: brandsError } = await supabase
    .from("brands")
    .select("id, name");
  if (brandsError) throw brandsError;

  const facetsMap = new Map<number, number>();
  for (const product of filteredProducts || []) {
    facetsMap.set(product.brand_id, (facetsMap.get(product.brand_id) || 0) + 1);
  }

  const facets: BrandFacet[] = allBrands.map(b => ({
    brand_id: b.id,
    brand: { name: b.name },
    count: facetsMap.get(b.id) || 0
  }));

  return facets.sort((a, b) => b.count - a.count).slice(0, 10);
};

export const getCategoryFacets = async ({
  q,
  brandIds
}: Pick<SearchParams, "q" | "brandIds">): Promise<CategoryFacet[]> => {
  let productsQuery = supabase
    .from("products")
    .select("id, product_categories(category_id)")
    .ilike("name", `%${q || ""}%`);

  if (brandIds?.length) {
    productsQuery = productsQuery.in("brand_id", brandIds);
  }

  const { data: filteredProducts, error: productsError } = await productsQuery;
  if (productsError) throw productsError;

  const { data: allCategories, error: categoriesError } = await supabase
    .from("categories")
    .select("id, name");
  if (categoriesError) throw categoriesError;

  const facetsMap = new Map<number, number>();
  for (const product of filteredProducts || []) {
    for (const pc of product.product_categories || []) {
      facetsMap.set(pc.category_id, (facetsMap.get(pc.category_id) || 0) + 1);
    }
  }

  const facets: CategoryFacet[] = allCategories.map(c => ({
    category_id: c.id,
    category: { name: c.name },
    count: facetsMap.get(c.id) || 0
  }));

  return facets.sort((a, b) => b.count - a.count).slice(0, 10);
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
