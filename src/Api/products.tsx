import { supabase } from "./Core/supabaseClient";

interface SearchParams {
  q?: string;
  brandIds?: number[];
  categoryIds?: number[];
  limit?: number;
  offset?: number;
}

export async function fetchProductsSearch({ searchQuery, brandIds, categoryIds, limit = 20, offset = 0 }: SearchParams) {
  let query = supabase
    .from("products")
    .select(`
      id,
      name,
      brand:brand_id(name),
      categories:product_categories(category_id(name))
    `)
    .range(offset, offset + limit - 1);

  if (searchQuery) query = query.ilike("name", `%${searchQuery}%`);
  if (brandIds?.length) query = query.in("brand_id", brandIds);
  if (categoryIds?.length) query = query.in("product_categories.category_id", categoryIds);

  const { data, error } = await query;
  if (error) throw error;

  return data;
}
