
// export const login = async (data: any) => {
//   const res = await api.post("/verifyUser", data);
//   return res.data;

import { Api } from "../../../shared/api/api-delivery";

// };
export const login = async (data: any) => {
  const res = await Api.post("/api/identity/login/local", data);
  return res.data;
};