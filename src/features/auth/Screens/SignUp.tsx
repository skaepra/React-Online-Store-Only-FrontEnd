import React, { useState, ChangeEvent, FormEvent } from "react";

// 1. تعريف واجهة لبيانات النموذج لضمان سلامة الأنواع
interface SignUpState {
  Name: string;
  Email: string;
  Password: string;
  Remamper: boolean; // احتفظنا بنفس الاسم البرمجي الحالي لديك
}

export default function SignUpScreen()  {
  const [values, setValues] = useState<SignUpState>({
    Name: "",
    Email: "",
    Password: "",
    Remamper: false,
  });

  // 2. تحديث معالج التغيير ليدعم كلاً من حقول النص والـ Checkbox بأمان
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    
    setValues((prevValues) => ({
      ...prevValues,
      // إذا كان نوع الحقل checkbox نأخذ قيمة checked البوليانية، وغير ذلك نأخذ الـ value النصية
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 3. تحديد نوع حدث إرسال النموذج (FormEvent)
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setValues({
      Name: "",
      Email: "",
      Password: "",
      Remamper: false,
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-screen text-white w-full flex justify-center items-center bg-[url(public/toje.jpg)] bg-center bg-cover bg-no-repeat">
      {/* يفضل دائماً إحاطة عناصر الإدخال بوسم <form> لتفعيل السلوك الطبيعي للنموذج عند الضغط على Enter */}
      <form onSubmit={onSubmit} className="space-y-3 border-2 border-[#9e9e9e] p-5 w-[320px] h-[370px] back rounded-lg">
        <div>
          <a href="/login" className="absolute top-4 left-4 right-0 w-0 h-0 bg-black">
            <svg className="w-6 h-6 text-white rounded-3xl border-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
            </svg>
          </a>

          <div className="flex justify-center">
            <h1 className="font-bold mb-2 mr-1 text-2xl text-white">Sign up</h1>
          </div>
        </div>

        <div className="space-y-5">
          <input
            type="text"
            name="Name"
            value={values.Name}
            onChange={onChangeHandler}
            className="p-4 w-full h-10 border-solid border-[2px] border-[#9e9e9e] bg-transparent rounded-2xl text-white"
            placeholder="user name"
            required
          />

          <input
            type="email"
            name="Email"
            value={values.Email}
            onChange={onChangeHandler}
            className="p-4 w-full h-10 border-solid border-[2px] border-[#9e9e9e] bg-transparent rounded-2xl text-white"
            placeholder="Your Email"
            required
          />

          <input
            type="password"
            name="Password"
            value={values.Password}
            onChange={onChangeHandler}
            className="p-4 w-full h-10 border-solid border-[2px] border-[#9e9e9e] bg-transparent rounded-2xl text-white"
            placeholder="password"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="Remamper"
            checked={values.Remamper}
            onChange={onChangeHandler}
            className="bg-transparent"
          />
          <h1 className="ml-2">Remember me</h1>
        </div>

        <div>
          {/* تم تعديل التحقق من التعطيل ليفحص كلاً من الاسم والبريد وكلمة المرور بشكل صحيح */}
          <button
            type="submit"
            disabled={values.Name === "" || values.Email === "" || values.Password === ""}
            className="bg-white hover:bg-[#e6e4e4] font-bold w-full py-1.5 text-black rounded-2xl transition-colors disabled:opacity-50"
          >
            Sign up
          </button>
        </div>

        <div className="flex justify-center">
          <a href="/login" className="flex">
            <span className="text-sm text-[#ececec]">Already have an account? </span>
            <span className="text-[15px] ml-1">Sign in</span>
          </a>
        </div>
      </form>
    </div>
  );
};

