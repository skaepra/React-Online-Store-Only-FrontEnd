import { SystemCategory } from "../../category/types/SystemCategoryType";
import { Merchant } from "../../Restaurante/types/MerchantType";

export interface SearchResponse {
  query: string;
  merchants: Merchant[];
  systemCategories: SystemCategory[];
}