import { NavLink } from "react-router-dom";
import { IoPersonOutline, IoLogOutOutline } from "react-icons/io5";
import { useLogout } from "../hooks/useLogout";
import { isTokenValid } from "../../../shared/utils/auth";

export function AuthActionButton() {
  const isLoggedIn = isTokenValid();
  const { performLogout, loading } = useLogout();

  if (isLoggedIn) {
    return (
      <button
        onClick={performLogout}
        disabled={loading}
        className="hidden h-10 shrink-0 items-center gap-2 rounded-full px-3 text-sm font-semibold transition-colors hover:bg-white/15 sm:flex"
        title="Logout"
      >
        <IoLogOutOutline className="text-lg" />
        <span className="hidden xl:inline">
          {loading ? "Logging out..." : "Log Out"}
        </span>
      </button>
    );
  }

  return (
    <NavLink
      to="/login"
      className="hidden h-10 shrink-0 items-center gap-2 rounded-full px-3 text-sm font-semibold transition-colors hover:bg-white/15 sm:flex"
      title="Account"
    >
      <IoPersonOutline className="text-lg" />
      <span className="hidden xl:inline">Sign in</span>
    </NavLink>
  );
}