import { useState, ChangeEvent, FormEvent } from "react";

// 1. تعريف واجهة لبيانات النموذج لضمان سلامة الأنواع
interface SignUpState {
  Name: string;
  Email: string;
  Password: string;
  Remember: boolean;
}


export default function SignUpScreen() {
  const [values, setValues] = useState<SignUpState>({
    Name: "",
    Email: "",
    Password: "",
    Remember: false,
  });

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setValues({
      Name: "",
      Email: "",
      Password: "",
      Remember: false,
    });
  };

  return (
    <div className={styles.screenWrapper}>
      <form onSubmit={onSubmit} className={styles.card}>
        <div>
          <a href="/login" className={styles.backLink} aria-label="Back to login">
            <svg
              className={styles.backIcon}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M5 12l4-4m-4 4 4 4"
              />
            </svg>
          </a>

          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Sign up</h1>
          </div>
        </div>

        <div className={styles.inputsContainer}>
          <input
            type="text"
            name="Name"
            value={values.Name}
            onChange={onChangeHandler}
            className={styles.input}
            placeholder="User Name"
            required
          />

          <input
            type="email"
            name="Email"
            value={values.Email}
            onChange={onChangeHandler}
            className={styles.input}
            placeholder="Your Email"
            required
          />

          <input
            type="password"
            name="Password"
            value={values.Password}
            onChange={onChangeHandler}
            className={styles.input}
            placeholder="Password"
            required
          />
        </div>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="remember-signup"
            name="Remamper"
            checked={values.Remember}
            onChange={onChangeHandler}
            className={styles.checkbox}
          />
          <label htmlFor="remember-signup" className={styles.checkboxLabel}>
            Remember me
          </label>
        </div>

        <div>
          <button
            type="submit"
            disabled={values.Name === "" || values.Email === "" || values.Password === ""}
            className={styles.submitBtn}
          >
            Sign up
          </button>
        </div>

        <div className={styles.signinContainer}>
          <a href="/login" className="flex items-center">
            <span className={styles.signinText}>Already have an account?</span>
            <span className={styles.signinLink}>Sign in</span>
          </a>
        </div>
      </form>
    </div>
  );
}



// 2. فصل كلاسات Tailwind في كائن منظم خارجي
const styles = {
  screenWrapper: "fixed top-0 left-0 right-0 h-screen text-white w-full flex justify-center items-center bg-[url('/toje.jpg')] bg-center bg-cover bg-no-repeat",
  card: "relative space-y-3.5 border-2 border-[#9e9e9e] p-5 w-[320px] backdrop-blur-sm bg-black/30 rounded-lg shadow-xl",
  
  // Header section
  backLink: "absolute top-4 left-4 p-1 hover:bg-white/10 rounded-full transition-colors",
  backIcon: "w-6 h-6 text-white rounded-full border-2",
  titleContainer: "flex justify-center",
  title: "font-bold text-2xl text-white mb-2",

  // Form inputs
  inputsContainer: "space-y-4",
  input: "p-4 w-full h-10 border-2 border-[#9e9e9e] bg-transparent rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:border-white transition-colors",

  // Checkbox
  checkboxContainer: "flex items-center",
  checkbox: "border bg-transparent rounded cursor-pointer accent-cyan-500",
  checkboxLabel: "ml-2 text-sm select-none cursor-pointer",

  // Submit button
  submitBtn: "border bg-white hover:bg-[#e6e4e4] disabled:opacity-50 disabled:hover:bg-white font-bold w-full py-1.5 text-black rounded-2xl transition-all cursor-pointer disabled:cursor-not-allowed",

  // Footer signin link
  signinContainer: "flex justify-center text-sm",
  signinText: "text-[#ececec]",
  signinLink: "ml-1 font-semibold hover:underline",
};