import { SignupFormData } from "../../auth/schemas/signupSchema";

export const initialSignupState: SignupFormData = {
  fullName: "",
  phone: "",
  password: "",
  confirmPassword: "",
  birthDate: null,
  countryCode: "SY" ,
  callingCode: "963",
  photoUrl: "",
};
