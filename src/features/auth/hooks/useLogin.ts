import { useState } from "react";
import { loginSchema } from "../schemas/loginSchema";
import { useForm } from "../../../shared/hooks/useForm";
import { initialLoginState } from "../../auth/constants/initialLoginState";
import { login } from "../services/loginApi";
import { LoginPayload } from "../types/LoginPayload";
import { getCustomDeviceID } from "../../../app/helper/getCustomDeviceID";
import { useAuthStore } from "../store/useAuthStore";

export function useLogin() {
  const form = useForm(initialLoginState, loginSchema);
  const { setAuthData } = useAuthStore();

  // حالة التحميل لتتبع حالة الطلب من السيرفر
  const [loading, setLoading] = useState(false);
  // لمعرفة ما إذا كان التحقق تم بنجاح
  const [isSuccess, setIsSuccess] = useState(false);
  // 🟢 حالتان  لإدارة الخطأ القادم من السيرفر
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async (): Promise<LoginPayload | null> => {
    // التحقق من وجود اتصال إنترنت
    if (!form.checkInternet()) return null;

    // التحقق من البيانات
    const validData = form.validate();
    if (!validData) return null;

    // تنظيف البيانات (حذف الحقول غير المطلوبة)
    const { countryCode, callingCode, ...cleanData } = validData;

    setLoading(true);
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage("");

    try {
      const deviceID = await getCustomDeviceID();

      // تجهيز البيانات النهائية للإرسال وحقن الـ deviceID داخلها
      const payload = {
        ...cleanData,
        phone: form.formatPhone(cleanData.phone, callingCode),
        deviceID,
        clientType: 1,
      };

      // 🔥 إرسال البيانات المحدثة للسيرفر
      const result = await login(payload);

      if (result && result.userId) {
        await setAuthData(
          result.userId,
          result.accessToken,
          result.refreshToken,
          deviceID,
          result.isProfileComplete,
        );
        setIsSuccess(true);
        setLoading(false);
      } else {
        setIsError(true);
        setErrorMessage("لم يتم العثور على الحساب، تحقق من البيانات المدخلة");
        setLoading(false);
      }

      return result;
    } catch (err: any) {
      console.log("Login failed:", err);

      // 🟢 إذا رفض السيرفر الطلب (أخطاء 400 أو 401 أو 404)
      setIsError(true);
      // يمكنك قراءة رسالة الخطأ من السيرفر مباشرة إذا كان يرسلها أو وضع رسالة افتراضية
      setErrorMessage(
        err.response?.data?.message ||
          "لم يتم العثور على الحساب، تحقق من البيانات المدخلة",
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
