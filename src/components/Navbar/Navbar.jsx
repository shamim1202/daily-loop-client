import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link, NavLink } from "react-router";

const Navbar = () => {
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

  return (
    <div className="bg-green-100">
      <div className="md:max-w-7xl mx-auto">
        <div className="navbar mx-0 px-0">
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
            <div className="flex items-center gap-2 md:gap-4">
              {/* <img className="rounded-full w-8 md:w-10 " src="" alt="" title="" /> */}
              <Link className="btn btn-outline btn-primary btn-sm md:btn-md">
                Login
              </Link>
              <Link className="btn btn-secondary btn-sm md:btn-md">
                Signup
              </Link>
            </div>
            {/* {user ? (
            <div className="flex items-center gap-2 md:gap-4">
              <img
                className="rounded-full w-8 md:w-10 "
                src={user.photoURL}
                alt=""
                title={user.displayName}
              />
              <button
                onClick={handleLogOut}
                className="btn btn-secondary btn-sm md:btn-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline btn-secondary btn-sm md:btn-md md:px-8"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-secondary btn-sm md:btn-md md:ml-5 md:px-8"
              >
                Register
              </Link>
            </>
          )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
