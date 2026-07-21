import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
// 1. استيراد useCartStore بدلاً من Context
import { Taggol } from "../../dark-mode/taggol";
import { useThemeMode } from "../../dark-mode/dark";
import { useCartStore } from "../../cart/store/useCartStore";

interface NavItem {
  name: string;
  link: string;
}

export default function Newnav() {
  const [isvisible, setisvisible] = useState<boolean>(true);
  const [list, setlist] = useState<boolean>(true);

  const { mode, toggleMode } = useThemeMode() as { mode: string; toggleMode: () => void };
  
  // 2. سحب عدد العناصر (quint) من السلة
  const quint = useCartStore((state) => state.AllQuantity);

  const navitem: NavItem[] = [
    { name: "Home", link: "/" },
    { name: "Rent", link: "/rent" },
    { name: "Card", link: "/Home" },
  ];

  const listhand = () => {
    setlist(!list);
  };

  const prevRef = useRef<number>(0);

  useEffect(() => {
    let ticking = false;

    const handler = () => {
      const curr = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (curr > prevRef.current && curr > 50) {
            setisvisible(false);
          } else {
            setisvisible(true);
          }

          prevRef.current = curr;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <div
        className={`${styles.navBase} ${
          isvisible ? styles.navVisible : styles.navHidden
        }`}
      >
        <div className={styles.leftSection}>
          <div className={styles.logoWrapper}>
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className={styles.logoImage}
              alt="Flowbite Logo"
            />
            <span className={styles.logoText}>
              Flowbite
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className={styles.desktopNavGroup}>
            {navitem.map((item, index) => (
              <div key={index}>
                <NavLink
                  to={item.link}
                  className={styles.desktopNavLink}
                >
                  <span className="ml-1 mr-1">{item.name}</span>
                </NavLink>
              </div>
            ))}

            <NavLink to="/cart" className={styles.cartWrapper}>
              <div className="sr-only sm:not-sr-only">
                <div className={styles.cartBadgeWrapper}>
                  <h1
                    className={`${styles.cartBadgeText} ${
                      quint > 9 ? "ml-[3px]" : "ml-[5.5px]"
                    }`}
                  >
                    {quint}
                  </h1>
                </div>
                <svg
                  className={styles.cartIcon}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="17"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                  />
                </svg>
              </div>
            </NavLink>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          <div className={styles.rightInner}>
            <div className={styles.toggleContainer}>
              <Taggol mode={mode} toggleMode={toggleMode} />
            </div>

            <div className={styles.subscribeWrapper}>
              <NavLink to="/login" className={styles.subscribeBtn}>
                <button>Subscribe</button>
              </NavLink>
            </div>

            <div className={styles.avatarWrapper}>
              <NavLink
                to="https://www.youtube.com"
                className={styles.avatarLink}
              >
                <img
                  className={styles.avatarImage}
                  src="src/assets/7.jpg"
                  alt="User Avatar"
                />
              </NavLink>
            </div>

            {/* Mobile Menu Button */}
            <div
              onClick={listhand}
              className={styles.mobileMenuToggle}
            >
              <svg
                className={styles.mobileMenuIcon}
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
                  strokeWidth="2"
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          <div className={styles.mobileDropdownWrapper}>
            <div className={`${list ? "sr-only" : "not-sr-only"} ${styles.mobileDropdownContainer}`}>
              {navitem.map((item, index) => (
                <div key={index}>
                  <NavLink
                    onClick={listhand}
                    to={item.link}
                    className={styles.mobileNavLink}
                  >
                    <span className="ml-1 mr-1">{item.name}</span>
                  </NavLink>
                </div>
              ))}
              <NavLink
                onClick={listhand}
                to="/cart"
                className={styles.mobileNavLink}
              >
                <span className="ml-1 mr-1">Cart</span>
              </NavLink>
              <NavLink
                onClick={listhand}
                to="/login"
                className={styles.mobileNavLink}
              >
                <span className="ml-1 mr-1">Sign in</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// 1. فصل جميع تنسيقات Tailwind في كائن styles خارجي
const styles = {
  navBase: "border-gray-900 dark:bg-zinc-900 bg-[#212b46] flex justify-between text-white fixed top-0 left-0 right-0 h-14 transition-all duration-700",
  navVisible: "top-0",
  navHidden: "-mt-16",

  leftSection: "flex-none sm:flex h-14 w-28 ml-2",
  logoWrapper: "flex items-center max-h-10 sm:mt-2.5 mt-3 max-w-24 mr-10",
  logoImage: "h-8",
  logoText: "self-center text-2xl font-semibold whitespace-nowrap dark:text-white",

  desktopNavGroup: "flex h-10 sm:mt-3 mt-5 space-x-3 items-center",
  desktopNavLink: "sr-only sm:not-sr-only flex justify-center w-12 ml-3 rounded-md size-7 sm:ml-3",

  cartWrapper: "sm:not-sr-only",
  cartBadgeWrapper: "w-[16px] ml-[29px] mt-1 h-[16px] bg-red-700 rounded-full flex absolute -translate-y-1.5",
  cartBadgeText: "text-black text-[10px] absolute",
  cartIcon: "w-[36px] h-[31px] ml-2 dark:text-white space-x-10",

  rightSection: "w-40 sm:w-auto",
  rightInner: "mr-2 h-14 flex",
  toggleContainer: "ml-14 sm:ml-0",

  subscribeWrapper: "sr-only sm:not-sr-only absolute",
  subscribeBtn: "flex justify-center backdrop-brightness-125 h-7 float-end w-20 m-3.5 ml-6 shadow-md rounded-md bg-cyan-500 shadow-cyan-500/50",

  avatarWrapper: "sr-only sm:not-sr-only",
  avatarLink: "rounded-full mt-2 ml-1 float-left",
  avatarImage: "w-10 h-10 rounded-full",

  mobileMenuToggle: "not-sr-only sm:sr-only dark:hover:bg-[#363636] hover:bg-gray-700 rounded mt-3 ml-2 h-8 w-8 cursor-pointer",
  mobileMenuIcon: "w-8 h-8 text-white",

  mobileDropdownWrapper: "not-sr-only sm:sr-only",
  mobileDropdownContainer: "w-44 mr-11",
  mobileNavLink: "flex justify-center w-40 bg-gray-900 dark:bg-zinc-900 border-black border-[1px] size-7",
};