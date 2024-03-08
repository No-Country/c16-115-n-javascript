import { NavLink } from "react-router-dom";
import logo from "../../assets/imgs/drive-rock-v4.webp";
import { scrollToTop } from "../../helpers/functions";

export const Footer = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="bg-gray-100">
        <div className="container px-5 py-6 mx-auto flex items-center justify-between sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <NavLink to="/" className="flex items-center justify-center ml-3" onClick={() => scrollToTop()}>
              <div className="flex items-center justify-between gap-2 text-[#222222] font-['monserrat']">
                <img
                  width={45}
                  height={45}
                  src={logo}
                  alt="logo"
                  className="drop-shadow-2xl-light w-[40px] sm:w-[45px]"
                />
                <h2 className="text-2xl italic font-['Barbaro'] tracking-wide text-[#18A0FB]">
                  Drive Rock
                </h2>
              </div>
            </NavLink>
          </a>
          <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">
            © 2024 Drive Rock —
            <a
              href="https://www.nocountry.tech/"
              rel="noopener noreferrer"
              className="text-gray-600 ml-1"
              target="_blank"
            >
              @No-Country
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
