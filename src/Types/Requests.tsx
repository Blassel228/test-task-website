export interface BaseSearchParams {
  q: string;
  category_ids?: number[];
  brand_ids?: number[];
}

export interface SearchParamsRequest extends Partial<BaseSearchParams> {
  offset: number;
  limit: number;
}

export interface GetCategoryCountsRequest extends BaseSearchParams {
  category_ids: number[];
}

export interface GetBrandCountsRequest extends BaseSearchParams {
  brand_ids: number[];
}