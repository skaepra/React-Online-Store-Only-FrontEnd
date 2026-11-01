import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";

type AuthMode = "login" | "signup";

type AuthScreenLayoutProps = {
  mode: AuthMode;
  children: ReactNode;
};

const copy: Record<
  AuthMode,
  {
    formTitle: string;
    divider: string;
    panelTitle: string;
    panelText: string;
    panelCta: string;
    panelTo: string;
  }
> = {
  signup: {
    formTitle: "Create Account",
    divider: "or use your email for registration:",
    panelTitle: "Welcome Back!",
    panelText:
      "To keep connected with us please login with your personal info",
    panelCta: "Sign In",
    panelTo: "/login",
  },
  login: {
    formTitle: "Sign In",
    divider: "or use your email account:",
    panelTitle: "Hello, Friend!",
    panelText: "Enter your details and start your shopping journey with us",
    panelCta: "Sign Up",
    panelTo: "/singUp",
  },
};

export function AuthScreenLayout({ mode, children }: AuthScreenLayoutProps) {
  const content = copy[mode];

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f7fb] px-4 py-10 dark:bg-[#1c1c20]">
      <div className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[#ffc220]" />
      <div className="pointer-events-none absolute -top-10 right-0 h-[340px] w-[340px] origin-top-right rotate-45 bg-[#ec4899] dark:bg-pink-500" />
      <div className="pointer-events-none absolute right-[18%] top-16 h-10 w-10 rotate-45 bg-indigo-200/80 dark:bg-indigo-400/30" />

      <div className="relative z-10 flex w-full max-w-[920px] flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_25px_80px_rgba(15,23,42,0.18)] dark:bg-zinc-900 dark:shadow-black/40 md:min-h-[540px] md:flex-row">
        <aside className="relative flex min-h-[280px] flex-col overflow-hidden bg-indigo-500 px-8 py-8 text-white dark:bg-gradient-to-br dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 md:w-[40%] md:px-10 md:py-10">
          <div className="pointer-events-none absolute -left-10 bottom-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute right-8 top-16 h-16 w-16 rotate-45 rounded-md bg-white/10" />
          <div className="pointer-events-none absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-black/10" />

          <NavLink
            to="/"
            className="relative z-10 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white/95"
          >
            <span className="grid h-8 w-8 place-items-center rounded-md border border-white/70 text-[11px] font-extrabold">
              B
            </span>
            Bazaar
          </NavLink>

          <div className="relative z-10 mx-auto my-auto flex max-w-[260px] flex-col items-center py-10 text-center md:py-0">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              {content.panelTitle}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/90">
              {content.panelText}
            </p>
            <NavLink
              to={content.panelTo}
              className="mt-8 inline-flex min-w-[170px] items-center justify-center rounded-full border-2 border-white px-8 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-indigo-500"
            >
              {content.panelCta}
            </NavLink>
          </div>
        </aside>

        <section className="flex flex-1 flex-col items-center justify-center px-6 py-10 sm:px-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-indigo-500 sm:text-[34px]">
            {content.formTitle}
          </h1>

          <div className="mt-6 flex items-center gap-3">
            <span className={styles.socialIcon} aria-hidden="true">
              <FaFacebookF size={13} />
            </span>
            <span className={styles.socialIcon} aria-hidden="true">
              <FaGoogle size={13} />
            </span>
            <span className={styles.socialIcon} aria-hidden="true">
              <FaLinkedinIn size={13} />
            </span>
          </div>

          <p className="mt-5 text-center text-[13px] text-gray-400 dark:text-zinc-400">
            {content.divider}
          </p>

          <div className="mt-4 w-full max-w-[340px]">{children}</div>
        </section>
      </div>
    </div>
  );
}

const styles = {
  socialIcon:
    "grid h-10 w-10 place-items-center rounded-full border border-gray-200 text-gray-700 dark:border-zinc-600 dark:text-gray-200",
};
