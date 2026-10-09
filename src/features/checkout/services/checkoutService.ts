import Api from "../../../shared/api/Api";
import { orderType } from "../../order/types/orderType";

export const AddOrders = async (orderData: Omit<orderType, "id">) => {
  const res = await Api.post<orderType>("orders", orderData);
  return res.data;
};