// hooks/useLogin.ts
import { useState } from "react";
import { login } from "../services/loginApi";
import { LoginPayload } from "../types/LoginPayload";
import { loginSchema } from "../schemas/loginSchema";
import { useForm } from "../../../shared/useForm";
import { initialLoginState } from "../constants/initialLoginState";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const form = useForm(initialLoginState, loginSchema);
    const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async (): Promise<any | null> => {
    const validData = form.validate();

    if (!validData) {
      console.log(
        "❌ فشل التحقق من البيانات (Zod Validation Failed):",
        form.errors
      );
      return null;
    }

    setLoading(true);
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage("");

    try {
      const payload: LoginPayload = {
        email:validData.Email,
        password: validData.password,
      };

      const result = await login(payload);

      if (result?.token) {
        localStorage.setItem("token", result.token);
      }

      setIsSuccess(true);
      setLoading(false);
      navigate("/")
      return result;
    } catch (error: any) {
      console.error(
        "❌ تفاصيل خطأ السيرفر الكاملة (Server Response):",
        error?.response?.data
      );
      setIsError(true);

      const responseData = error?.response?.data;
      let parsedErrorMessage = "فشل تسجيل الدخول، يرجى المحاولة لاحقاً";

      // 🔍 1. استخراج أخطاء الـ ASP.NET Model Validation (ProblemDetails.errors)
      if (responseData?.errors) {
        const errs = responseData.errors;

        // 1️⃣ إذا كانت مصفوفة مباشرة -> خذ أول عنصر
        if (Array.isArray(errs) && errs.length > 0) {
          parsedErrorMessage = errs[0];
        }
        // 2️⃣ إذا كانت كائن بحقول -> خذ أول قيمة لأول حقل
        else if (typeof errs === "object") {
          const firstValues = Object.values(errs)[0];
          parsedErrorMessage = Array.isArray(firstValues)
            ? firstValues[0]
            : String(firstValues);
        }
      } 
      // 🔍 2. التعامل مع الرسائل المباشرة المرتجعة من السيرفر (مثل detail أو title أو message)
      else if (responseData?.detail) {
        parsedErrorMessage = responseData.detail;
      } else if (responseData?.message) {
        parsedErrorMessage = responseData.message;
      } else if (responseData?.title) {
        parsedErrorMessage = responseData.title;
      }

      setErrorMessage(parsedErrorMessage);
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