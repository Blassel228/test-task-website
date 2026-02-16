export interface BrandFacet {
  brand_id: number;
  brand: { name: string };
  count: number;
}

export interface CategoryFacet {
  category_id: number;
  category: { name: string };
  count: number;
}