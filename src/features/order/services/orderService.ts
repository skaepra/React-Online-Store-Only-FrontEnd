import Api from "../../../shared/api/Api";
import { orderType } from "../types/orderType";

export const getOrders  = async () => {
  const res = await Api.get<orderType[]>("orders");
  return res.data;
};


