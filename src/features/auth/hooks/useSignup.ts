// hooks/useSignup.ts
import { useState } from "react";
import { initialSignupState } from "../../auth/constants/initialSignupState";
import { signup } from "../services/signupApi";
import { SignupPayload } from "../types/SignupPayload";
import { signUpSchema } from "../schemas/signupSchema";
import { useForm } from "../../../shared/useForm";

export function useSignup() {
  const form = useForm(initialSignupState, signUpSchema);

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async (): Promise<SignupPayload | null> => {
    // 🔍 1. فحص هل البيانات تعبر الـ Validation أم لا
    const validData = form.validate();
    
    if (!validData) {
      console.log("❌ فشل التحقق من البيانات (Zod Validation Failed):", form.errors);
      return null;
    }

    // تنظيف البيانات
    const { countryCode, callingCode, ...cleanData } = validData;

    setLoading(true);
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage("");

    try {
      // 🚀 2. إرسال البيانات للسيرفر
      console.log("📤 جاري إرسال البيانات إلى db.json:", cleanData);
      const result = await signup(cleanData);

      setIsSuccess(true);
      setLoading(false);
      return result;
    } catch (error: any) {
      // 💥 3. التقاط خطأ السيرفر
      console.error("❌ خطأ أثناء حفظ المستخدم:", error);
      setIsError(true);
      setErrorMessage(
        error?.response?.data?.message || "فشل إنشاء الحساب، يرجى المحاولة لاحقاً"
      );
      setLoading(false);
      return null;
    }
  };

  const resetLoadingState = () => {
    setLoading(false);
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage("");
  };

  return {
    ...form,
    loading,
    isSuccess,
    isError,
    errorMessage,
    resetLoadingState,
    submit,
  };
}