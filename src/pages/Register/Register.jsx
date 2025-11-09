import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";

const Register = () => {
  const { user, signInUser, setUser, googleSignIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = (e) => {
    e.preventDefault();
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        setUser(user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Welcome back, ${user.displayName || "Guest!"}`,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((err) => {
        const message = err.message;
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${message}`,
          text: "Login failed! Please try again.",
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  return (
    <div className="md:max-w-7xl mx-auto bg-linear-to-r from-blue-100 via-purple-100 to-green-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-center">
        <div className=" md:flex-1">
          <img
            className="md:w-2xl"
            src="https://i.ibb.co.com/TD1pywZW/register.png"
            alt=""
          />
        </div>

        <div className="py-4 md:py-12 flex md:flex-1 flex-col items-center justify-center px-4 md:rounded">
          <div className="card w-full max-w-md shadow-xl hover:shadow-2xl transition-all duration-300">
            {/* {loading && <loading></loading> } */}
            {/* ---- Title ---- */}
            <h1 className="text-secondary text-lg md:text-4xl font-bold mt-4 md:mt-6 text-center">
              Register Your Account
            </h1>

            <form onSubmit={handleRegister} className="card-body">
              <fieldset className="fieldset">
                {/* ------- Name Field ------ */}
                <label className="label text-sm md:text-base">Name</label>
                <input
                  type="name"
                  name="name"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full text-xs md:text-sm"
                  placeholder="Your Name"
                />

                {/* ------- Email Field ------ */}
                <label className="label text-sm md:text-base">Email</label>
                <input
                  type="email"
                  name="email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full text-xs md:text-sm"
                  placeholder="Email"
                />

                {/* ------- PhotoUrl Field ------ */}
                <label className="label text-sm md:text-base">Photo-Url</label>
                <input
                  type="text"
                  name="photo_url"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full text-xs md:text-sm"
                  placeholder="Photo Url"
                />

                <label className="label text-sm md:text-base">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="input input-bordered w-full text-xs md:text-sm pr-10"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
                  >
                    <span className="md:text-xl">
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </button>
                </div>

                <button
                  type="submit"
                  className="btn btn-secondary btn-outline btn-sm md:btn-md md:mt-5 w-full"
                >
                  Register
                </button>
              </fieldset>
            </form>

            <div className="divider mt-0 text-xs md:text-sm">Or</div>
            {/* --------- Google ---------- */}
            <button
              onClick={handleGoogleLogin}
              className="btn btn-sm md:btn-md bg-white text-[0c0c0c] border border-[#dfdfdf] hover:shadow transition-all duration-300 mx-6"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>

            {/* -------- Register Navigation -------- */}
            <p className="text-center text-sm md:text-base text-gray-600 my-2 md:my-5">
              Allready have an account?{" "}
              <Link
                to="/auth/login"
                className="text-primary hover:text-red-500 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
