import { useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../context/AuthProvider";
import { usePageTitle } from "../../hooks/usePageTitle";

const Login = () => {
  const { user, setUser, signInUser, googleSignIn, loading, setLoading } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((res) => {
        const user = res.user;
        setUser(user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Welcome back, ${user.displayName || "Guest!"}`,
          showConfirmButton: false,
          timer: 2000,
        });
        setLoading(false);
        form.reset();
        // navigate(`${location.state ? location.state : "/"}`);
        navigate(location.state?.from || "/");
      })
      .catch((err) => {
        const code = err.code;
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${code}`,
          text: "Login failed! Please try again.",
          showConfirmButton: false,
          timer: 2000,
        });
        setLoading(false);
      });
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

        navigate(location.state?.from || "/");
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

  usePageTitle("Login")

  return (
    <div className="md:max-w-7xl mx-auto bg-linear-to-r from-blue-100 via-purple-100 to-green-100">
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-center">
          <div className="py-4 md:py-12 flex md:flex-1 flex-col items-center justify-center px-4 md:rounded">
            {/* ----------- Login Card ------------- */}
            <div className="card w-full max-w-md shadow-xl hover:shadow-2xl transition-all duration-300 pb-5 md:pb-0">
              {/* ---- Title ---- */}
              <h1 className="text-primary text-2xl md:text-4xl font-bold mt-2 md:mt-6 text-center">
                Login to Your Account
              </h1>

              <form onSubmit={handleLogin} className="card-body">
                <fieldset className="fieldset">
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

                  <div className="text-right mt-2">
                    <span
                      onClick={() =>
                        Navigate("/auth/forgot_password", { state: {} })
                      }
                      className="link link-hover text-sm md:text-base text-primary cursor-pointer"
                    >
                      Forgot password?
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-outline btn-sm md:btn-md md:mt-5 w-full"
                  >
                    Login
                  </button>
                </fieldset>
              </form>

              <div className="divider mt-0 text-xs md:text-sm">Or</div>
              {/* --------- Google ---------- */}
              <button
                onClick={handleGoogleLogin}
                className="btn btn-sm md:btn-md bg-white text-black border border-[#dfdfdf] hover:shadow transition-all duration-300 mx-6"
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
                Don’t have an account?{" "}
                <Link
                  to="/auth/register"
                  className="text-secondary hover:text-red-500 font-medium hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>

          <div className=" md:flex-1">
            <img
              className="md:w-2xl"
              src="https://i.ibb.co.com/Z64dx37b/login.png"
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
