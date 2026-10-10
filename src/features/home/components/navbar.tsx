import { FormEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Taggol } from "../../dark-mode/taggol";
import LocationPickerMaps from "../../google-map/screen/LocationPickerMaps";

import {
  IoCartOutline,
  IoLocationOutline,
  IoMenu,
  IoClose,
  IoSearchOutline,
} from "react-icons/io5";
import { navItems, useNavbar } from "../hook/useNavbar";
import { useAppSelector } from "../../../store/hooks";
import { selectCartQuantity } from "../../cart/store/cartSelectors";

import { AuthActionButton } from "../../auth/components/AuthActionButton";
import { isTokenValid } from "../../../shared/utils/auth";

export default function AppNavbar() {
  const {
    isVisible,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isMapOpen,
    setIsMapOpen,
    selectedAddress,
    mode,
    toggleMode,
    toggleMobileMenu,
    handleConfirmLocation,
  } = useNavbar();

  const quantity = useAppSelector(selectCartQuantity);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  const searchForm = (
    <form
      onSubmit={handleSearch}
      role="search"
      className="flex h-10 w-full items-center rounded-full bg-white p-1 pl-4 shadow-sm focus-within:ring-2 focus-within:ring-[#ffc220] dark:focus-within:ring-zinc-700
      dark:bg-zinc-800"
    >
      <input
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search products"
        aria-label="Search products"
        className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-500 dark:text-white dark:placeholder:text-zinc-400 outline-none "
      />
      <button
        type="submit"
        aria-label="Search"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#0071ce] text-white transition-colors hover:bg-[#005da8] dark:bg-zinc-700"
      >
        <IoSearchOutline className="text-lg" />
      </button>
    </form>
  );

  return (
    <>
      {/* 1. Header Navigation Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="bg-[#0071ce] dark:bg-zinc-900 text-white shadow-md">
          <div className="mx-auto flex h-[62px] max-w-[1440px] items-center gap-3 px-4 sm:px-6">
            <button
              onClick={toggleMobileMenu}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors hover:bg-white/15 md:hidden"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <IoClose className="text-2xl" />
              ) : (
                <IoMenu className="text-2xl" />
              )}
            </button>

            <NavLink
              to="/"
              className="flex w-full flex-1 items-center gap-1 sm:w-auto md:flex-initial sm:shrink-0"
              aria-label="Store home"
            >
              <span className="text-[21px] font-extrabold tracking-tight">
                Bazaar
              </span>
            </NavLink>
 

            <div className="hidden min-w-0 flex-1 md:block md:px-4 lg:px-8">
              {searchForm}
            </div>

            <button
              onClick={() => setIsMapOpen(true)}
              className="hidden shrink-0 items-center gap-2 rounded-full px-3 py-2 text-left transition-colors hover:bg-white/15 lg:flex"
              title="Select delivery location"
            >
              <IoLocationOutline className="text-xl text-[#ffc220] " />
              <span className="max-w-[125px]">
                <span className="block text-[10px] text-white/80">
                  Deliver to
                </span>
                <span className="block truncate text-xs font-semibold">
                  {selectedAddress || "Choose location"}
                </span>
              </span>
            </button>

            <div className=" items-center flex">
              <Taggol mode={mode} toggleMode={toggleMode} />
            </div>
            
           <AuthActionButton/>

            <NavLink
              to="/cart"
              className="relative flex h-10 shrink-0 items-center gap-1 rounded-full px-2 transition-colors hover:bg-white/15 "
              title="Cart"
            >
              <IoCartOutline className="text-[25px]" />
              <span className="hidden text-xs font-semibold xl:inline">
                Cart
              </span>
              {quantity > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[#ffc220] px-1 text-[10px] font-bold text-slate-900 ">
                  {quantity > 99 ? "99+" : quantity}
                </span>
              )}
            </NavLink>
          </div>

          <div className="mx-auto max-w-[1440px] px-4 pb-2 sm:px-6 md:hidden">
            {searchForm}
          </div>

          <div className="hidden border-t border-white/20 bg-white text-slate-800 dark:text-white dark:bg-zinc-800 md:block">
            <nav className="mx-auto flex h-10 max-w-[1440px] items-center gap-1 px-4 sm:px-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.link}
                  to={item.link}
                  onClick={() => window.scrollTo({ top: 0 })}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                      isActive
                        ? "bg-[#eaf4fc] text-[#005da8] dark:bg-zinc-700 dark:text-white "
                        : "hover:bg-slate-100 dark:hover:bg-zinc-600"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* 2. Mobile Sidebar Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sidebar Drawer */}
          <div className="relative z-10 mr-auto flex h-full w-[80%] max-w-xs flex-col justify-between border-r border-slate-200 bg-white dark:bg-zinc-900 dark:border-zinc-800 p-6 shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="space-y-6">
              {/* Header Drawer */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <span className="text-lg font-bold text-slate-900 dark:text-white">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-lg p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  <IoClose className="text-2xl" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-1">
                {navItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-[#eaf4fc] dark:bg-zinc-800 font-bold text-[#005da8] dark:text-slate-300"
                          : "text-slate-700  hover:bg-slate-100 dark:text-white  "
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}

                <NavLink
                  to="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-slate-700 dark:text-white hover:bg-slate-100"
                >
                  <span>Shopping Cart</span>
                  <span className="rounded-full bg-[#fff3cf] px-2 py-0.5 text-xs font-bold text-slate-900 flex justify-center space-x-1">
                   <span>{quantity}</span> <span>Items</span>
                  </span>
                </NavLink>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsMapOpen(true);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left text-sm font-medium text-[#005da8] transition-colors hover:bg-[#eaf4fc]"
                >
                  <IoLocationOutline className="text-lg" />
                  <span className="truncate">
                    {selectedAddress
                      ? `${selectedAddress}`
                      : "تحديد الموقع الجغرافي"}
                  </span>
                </button>
              </nav>
            </div>

            {/* Footer / Login Button */}
            <div className="border-t border-slate-200 pt-4">
              <NavLink
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full rounded-full bg-[#0071ce] py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#005da8] active:scale-95
                  ${isTokenValid()?"bg-[#b93131] hover:bg-[#ac2929]":""} `}
              >
                {isTokenValid()?"Log Out":"Log In"} 
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {/* 3. Map Modal */}
      {isMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl h-[520px] bg-white dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-white/10">
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold shadow-md pointer-events-auto">
                📍 اختر موقعك
              </span>
              <button
                onClick={() => setIsMapOpen(false)}
                className="pointer-events-auto bg-slate-900/80 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-md"
              >
                ✕
              </button>
            </div>

            <div className="w-full h-full relative">
              <LocationPickerMaps onConfirm={handleConfirmLocation} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
