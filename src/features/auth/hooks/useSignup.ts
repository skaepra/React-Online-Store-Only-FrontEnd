import { signupSchema } from "../schemas/signupSchema";
import { formatDate } from "../../../shared/utils/date/formatDate";
import { useForm } from "../../../shared/hooks/useForm";
import { initialSignupState } from "../../auth/constants/initialSignupState";
import { signup } from "../services/signupApi";
import { SignupPayload } from "../types/SignupPayload";
import { useState } from "react";

export function useSignup() {
  const form = useForm(initialSignupState, signupSchema);

  // 🟢 إدارة الحالات الثلاث لـ الـ Overlay ومحاكاة الـ Login تماماً
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async (): Promise<SignupPayload | null> => {
    // التحقق من وجود اتصال إنترنت
    if (!form.checkInternet()) return null;

    // التحقق من البيانات
    const validData = form.validate();
    
    if (!validData) return null;

    // تنظيف البيانات (حذف الحقول غير المطلوبة)
    const { countryCode, callingCode, confirmPassword, ...cleanData } =
      validData;

    // تفعيل الحالات قبل إرسال الطلب
    setLoading(true);
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage("");

    
    try {
      // 🟢 تجهيز البيانات النهائية للإرسال
      const payload = {
        ...cleanData,
        phone: form.formatPhone(cleanData.phone, callingCode),
        birthDate: formatDate(cleanData.birthDate),
        photoUrl: cleanData.photoUrl.startsWith('/') 
    ? `https://poster-attentive-sadly.ngrok-free.dev${cleanData.photoUrl}` 
    : cleanData.photoUrl, // سينتقل الرابط الراجع من السيرفر تلقائياً هنا 👍
      };
      console.log(payload);
      // 🔥 إرسال البيانات المحدثة للسيرفر الفعلي
      const result = await signup(payload);

      if (result) {
        setIsSuccess(true);
        setLoading(false); // نغلق الـ loading لتفعيل الـ useEffect الخاص بالتوجيه في الشاشة
      } else {
        setIsError(true);
        setErrorMessage("حدث خطأ أثناء إنشاء الحساب، يرجى المحاولة مرة أخرى");
        setLoading(false);
      }

      return result;
    } catch (err: any) {
      console.log("Sign Up failed:", err);
         
      setIsError(true);
      // قراءة رسالة الخطأ من السيرفر إذا كان الحساب مسجلاً مسبقاً مثلاً، أو وضع رسالة افتراضية
      setErrorMessage(
        err.response?.data?.message ||
          "رقم الهاتف مسجل بالفعل أو البيانات غير صالحة",
      );

      setLoading(false);
      return null;
    }
  };

  // دالة لتصفير الحالات عند إعادة المحاولة
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
