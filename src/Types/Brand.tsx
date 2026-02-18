export interface Brand {
  id: number;
  name: string;
}

export interface TopBrand {
  total: number;
  brand_id: number;
  brand_name: number;
}

export interface BrandCount{
  brand_id: number;
  count: number;
}