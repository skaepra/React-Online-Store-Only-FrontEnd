import { LoginFormData } from "../../auth/schemas/loginSchema";

export const initialLoginState: LoginFormData = {
  phone: "",
  password: "",
  countryCode: "SY",
  callingCode: "963",
};