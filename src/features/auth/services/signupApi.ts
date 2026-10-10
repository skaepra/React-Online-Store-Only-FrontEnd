// services/signupApi.ts
import Api from "../../../shared/api/apis";

export const signup = async (data: any) => {
  const res = await Api.post('/api/Auth/createEmployee', data);
  return res.data;
};