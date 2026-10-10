import Api from "../../../shared/api/apis";

export const login = async (data: any) => {
  const res = await Api.post('/api/Auth/login',data);
  return res.data;
};
