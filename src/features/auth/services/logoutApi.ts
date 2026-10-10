import Api from "../../../shared/api/apis";

export const logout = async () => {
  // الـ Authorization Header يتم إرفاقه تلقائياً عن طريق الـ Axios Interceptor
  const res = await Api.post("/api/Auth/logout");
  return res.data;
};