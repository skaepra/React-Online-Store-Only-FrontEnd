import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType(); // لمعرفة نوع التنقل (PUSH, REPLACE, POP)

  useEffect(() => {
    // إذا كان نوع التنقل هو "POP" (أي زر الرجوع أو التقدم)، لا تقم بإجبار الصفحة على الصعود للأعلى
    if (navigationType === "POP") {
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname, navigationType]);

  return null;
}