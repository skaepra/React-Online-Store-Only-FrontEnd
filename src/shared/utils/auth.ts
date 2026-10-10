// utils/auth.ts
export const isTokenValid = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    // قراءة جزء الـ Payload من الـ JWT
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) return false;

    const decodedPayload = JSON.parse(atob(payloadBase64));
    const exp = decodedPayload.exp;

    if (!exp) return true; // إذا لم يحوِ تاريخ انتهاء يُعتبر معتمداً

    // تحويل الثواني إلى ملي ثانية ومقارنتها بالوقت الحالي
    const currentTime = Date.now() / 1000;
    
    if (exp < currentTime) {
      localStorage.removeItem("token"); // تنظيف التوكن المنتهي تلقائياً
      return false;
    }

    return true;
  } catch (error) {
    console.error("خطأ في قراءة الـ Token:", error);
    localStorage.removeItem("token");
    return false;
  }
};