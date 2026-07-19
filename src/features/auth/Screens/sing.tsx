import React, { useState, ChangeEvent, FormEvent } from "react";

// 1. تعريف واجهة المستخدم لبيانات الفورم (Form Interface)
interface LoginValues {
  Email: string;
  Password: string;
  Remamper: boolean; // (Remember me)
}

const Login = () => {
  const [values, setValues] = useState<LoginValues>({
    Email: "",
    Password: "",
    Remamper: false,
  });

  // 2. تحديث دالة التغيير مع حل مشكلة الـ Dynamic Keys في TypeScript
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    
    // تحويل اسم الحقل (string) إلى نوع متوافق مع مفاتيح الـ interface
    const fieldName = name as keyof LoginValues;
    const fieldValue = type === "checkbox" ? checked : value;

    setValues({
      ...values,
      [fieldName]: fieldValue,
    });
  };

  // 3. تحديد نوع حدث الإرسال (Form Submit Event)
  const onSubmit = (event: FormEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValues({
      Email: "",
      Password: "",
      Remamper: false,
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-screen text-white w-full flex justify-center items-center bg-[url(public/toje.jpg)] bg-center bg-cover bg-no-repeat">
      <div className="space-y-3.5 border-2 border-[#9e9e9e] p-5 w-[320px] h-[340px] back rounded-lg">
        <div>
          <a href="/" className="absolute top-4 left-4 right-0 w-0 h-0 bg-black">
            <svg className="w-6 h-6 text-white rounded-3xl border-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
            </svg>
          </a>

          <div className="flex justify-center">
            <h1 className="font-bold w-11 mb-2 mr-5 text-2xl text-white">Login</h1>
          </div>
        </div>

        <div className="space-y-5">
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

        <div className="flex">
          <input  
            type="checkbox" 
            name="Remamper"  
            checked={values.Remamper} 
            onChange={onChangeHandler}
            className="border bg-transparent"
          />
          <h1 className="ml-2">Remember me</h1>
        </div>

        <div>
          <button 
            type="submit" 
            onClick={onSubmit}
            disabled={values.Email === "" || values.Password === ""} 
            className="border bg-white hover:bg-[#e6e4e4] font-bold w-full py-1.5 text-black rounded-2xl" 
          >
            Login
          </button>
        </div>
        
        <div className="flex justify-center">
          <a href="sing" className="flex">
            <span className="text-sm text-[#ececec]">Dont have an account? </span>
            <span className="text-[15px] ml-1">Sign up</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;