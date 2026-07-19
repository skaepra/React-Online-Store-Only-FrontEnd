import { Api } from "../../../shared/api/api-delivery";

export const checkout = async (data: any) => {
  const res = await Api.post("/api/orders", data);
  return res.data;
};