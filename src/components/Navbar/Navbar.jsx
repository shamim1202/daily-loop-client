import { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";

const Navbar = () => {
  const { user, signOutUser, loading, setLoading } = useContext(AuthContext);
  const [Open, setOpen] = useState(false);

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
  );

  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You successfully logged out",
          showConfirmButton: false,
          timer: 2000,
        });
        setLoading(false);
      })
      .catch((err) => {
        const code = err.code;
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${code}`,
          text: "Logout failed! Please try again.",
          showConfirmButton: false,
          timer: 2000,
        });
        setLoading(false);
      });
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
              src="/src/assets/logo.png"
              alt=""
              className="md:w-16 lg:w-20 hidden md:block"
            />
          </Link>
        </div>

        {/*--------> Navigation Bar Center <---------- */}
        <div className="navbar-center md:font-medium">
          <Link to="/">
            <img
              src="/src/assets/logo.png"
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
          {user ? (
            <div className="flex items-center gap-2 md:gap-4">
              <img
                className="rounded-full w-8 md:w-10 "
                src={user.photoURL}
                alt=""
                title={user.displayName}
              />
              <button
                onClick={handleLogOut}
                className="btn btn-secondary btn-xs md:btn-md"
              >
                Logout
              </button>
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
