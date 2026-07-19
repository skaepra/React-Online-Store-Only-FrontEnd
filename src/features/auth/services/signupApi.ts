import { Api } from "../../../shared/api/api-delivery";


export const signup = async (data: any) => {
  const res = await Api.post("/api/identity/register/local", data);
  return res.data;
};
