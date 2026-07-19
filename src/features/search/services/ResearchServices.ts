import { Api } from "../../auth/hooks/useBackgroundRefresh";
import { SearchResponse } from "../types/SearchResponse";


export const getResearch = async (queryText: string): Promise<SearchResponse> => {
  // نقوم بتمرير الـ queryText داخل مسار الـ URL مباشرة
  const res = await Api.get<SearchResponse>(`/api/catalog/search?query=${encodeURIComponent(queryText)}`);
  
  // سيعود لك الـ البيانات بالـ Schema التي تظهر في الـ Swagger
  return res.data;
};