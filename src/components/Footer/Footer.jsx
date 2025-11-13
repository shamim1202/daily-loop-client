import {
  FaDiscord,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="md:max-w-7xl mx-auto bg-linear-to-r from-blue-100 via-purple-100 to-green-100 px-6 md:px-12 py-6 md:py-0">
      <div className=" text-primary md:py-8">
        <div className="md:max-w-7xl mx-auto flex flex-col-reverse md:flex-row md:gap-40 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:w-full justify-between space-y-3 md:space-y-0">
            <nav>
              <h6 className="text-base md:text-lg font-semibold opacity-70 md:mb-2">
                Services
              </h6>
              <div className="flex flex-col text-xs md:text-base">
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
              </div>
            </nav>

            <nav>
              <h6 className="text-base md:text-lg font-semibold opacity-70 md:mb-2">
                Company
              </h6>
              <div className="flex flex-col text-xs md:text-base">
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
              </div>
            </nav>

            <nav>
              <h6 className="text-base md:text-lg font-semibold opacity-70 md:mb-2">
                Legal
              </h6>
              <div className="flex flex-col text-xs md:text-base">
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
              </div>
            </nav>
          </div>

          {/* ------> Subscribe <------- */}
          <div className="md:w-6/12 mb-5 md:mb-0">
            <form>
              <h6 className="text-base md:text-lg font-semibold opacity-70 md:mb-2">
                Newsletter
              </h6>
              <fieldset className="w-full">
                <label className="text-xs md:text-base">
                  Enter your email address
                </label>
                <div className="join w-full">
                  <input
                    type="text"
                    placeholder="username@site.com"
                    className="input input-sm md:input-md input-bordered join-item"
                  />
                  <button className="btn btn-sm md:btn-md btn-secondary join-item">
                    Subscribe
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-8">
          <nav className="flex flex-row items-center justify-center gap-4 mb-4">
            <a href="https://x.com" target="_blank" className="md:text-2xl">
              <FaXTwitter />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              className="md:text-2xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="md:text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="md:text-2xl"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              className="md:text-2xl"
            >
              <FaDiscord />
            </a>
          </nav>

          <aside className="flex flex-col items-center justify-center">
            <Link to="/">
              <img
                src="https://i.ibb.co.com/7dww9QDP/logo.png"
                alt=""
                className="w-14 md:w-20 "
              />
            </Link>
            <p className="text-xs md:text-sm pt-2 md:pt-4">
              Copyright © {new Date().getFullYear()} Daily Loop Inc. All right
              reserved
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Footer;
