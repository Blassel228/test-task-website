export interface Category {
  id: number;
  name: string;
}

export interface TopCategory {
  total: number;
  category_name: string;
  category_id: number;
}


export interface CategoryCount {
  category_id: number;
  count: number;
}
