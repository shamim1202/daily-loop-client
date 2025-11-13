import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";

const Navbar = () => {
  const { user, signOutUser, loading, setLoading } = useContext(AuthContext);
  const [Open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Navigation Bar Toggle Class
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-secondary border-b-2 border-secondary"
      : "text-primary hover:text-secondary border-b-2 border-transparent";

  //   Navigation Bar Menu Links ----------------------->
  const links = (
    <>
      <li>
        <NavLink to="/" end className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/public_habits" className={navLinkClass}>
          Public Habits
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/my_habits" className={navLinkClass}>
              My Habits
            </NavLink>
          </li>
          <li>
            <NavLink to="/add_habit" className={navLinkClass}>
              Add Habit
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const handleLogOut = async () => {
    try {
      setLoading(true);
      await signOutUser();
      setLoading(false);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logged out successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/", { replace: true });
    } catch (err) {
      setLoading(false);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Logout failed",
        text: err.message || "Please try again",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div className="md:max-w-7xl mx-auto bg-linear-to-r from-blue-100 via-purple-100 to-green-100">
      <div className="navbar mx-0 px-5 md:px-10">
        {/*--------> Navigation Bar Start <---------- */}
        <div className="navbar-start">
          <div className="dropdown block md:hidden">
            <button
              onClick={() => setOpen(!Open)} // <-- new
              className="btn btn-ghost lg:hidden"
              aria-label="Menu"
            >
              {Open ? (
                <IoClose className="w-6 h-6" />
              ) : (
                <GiHamburgerMenu className="w-5 h-5" />
              )}
            </button>
            {Open && (
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-2 w-36 p-2 shadow absolute top-full left-2 z-50 lg:hidden">
                {links}
              </ul>
            )}
          </div>
          <Link to="/">
            <img
              src="https://i.ibb.co.com/7dww9QDP/logo.png"
              alt=""
              className="md:w-16 lg:w-20 hidden md:block"
            />
          </Link>
        </div>

        {/*--------> Navigation Bar Center <---------- */}
        <div className="navbar-center md:font-medium">
          <Link to="/">
            <img
              src="https://i.ibb.co.com/7dww9QDP/logo.png"
              alt=""
              className="w-16 block md:hidden"
            />
          </Link>
          <ul className="hidden md:flex items-center md:gap-4 md:text-lg">
            {links}
          </ul>
        </div>

        {/*--------> Navigation Bar End <---------- */}
        <div className="navbar-end">
          {loading ? (
            <div className="flex items-center justify-center">
              <span className="loading loading-spinner loading-sm"></span>
            </div>
          ) : user ? (
            <div className="flex items-center gap-2 md:gap-4">
              <button
                tabIndex={0}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="rounded-full w-10 md:w-14 border-2 border-transparent hover:border-secondary transition focus:outline-none"
              >
                <img
                  src={user?.photoURL || user?.displayName}
                  alt="User Avatar"
                  className="rounded-full w-full h-full"
                />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    key="dropdown"
                    tabIndex={0}
                    onBlur={() => setDropdownOpen(false)}
                    initial={{ opacity: 0, scale: 0.9, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-16 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 focus:outline-none"
                  >
                    <div className="p-4 border-b">
                      <p className="text-sm md:text-base font-semibold text-primary">
                        {user.displayName || "No Name"}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogOut}
                      className="w-full text-left px-4 py-2 text-sm font-semibold text-red-500 hover:bg-gray-50 hover:rounded-lg"
                    >
                      Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="space-x-2 md:space-x-0">
              <Link
                to="/auth/login"
                className="btn btn-outline btn-primary btn-xs md:btn-md md:px-8"
              >
                Login
              </Link>

              <Link
                to="/auth/register"
                className="btn btn-secondary btn-xs md:btn-md md:ml-5 md:px-8"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
