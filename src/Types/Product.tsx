import {Category} from "./Catagory.tsx";
import {Brand} from "./Brand.tsx";

export interface Product {
  id: string;
  name: string;
  image?: string | null;
  created_at: string;
  brand?: Brand | null;
  categories?: Category[];
}