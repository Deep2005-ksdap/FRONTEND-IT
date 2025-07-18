import { useContext, useState } from "react";
import style from "./NavBar.module.css";
import { Logic } from "../../store/logic";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [active, setActive] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(Logic);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true); // simulate login
    setActive(true);
    navigate("/home/dashboard"); // go to dashboard
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // simulate logout
    navigate("/"); // go to home
  };

  return (
    <nav
      className={`flex w-full items-center justify-center  py-2 bg-gradient-to-r from-blue-100 via-white to-green-100 shadow-xl`}
    >
      <div style={{width:"95%",}} className="flex justify-between items-center">
        <Link to="/" className="flex flex-col space-x-3">
          <img
            src="/logo.png"
            alt="Inventory-trackor"
            className="h-16 w-auto object-contain sm:h-12 rounded-full ml-4"
          />
          <div className="hidden sm:inline">
            <span className="font-bold text-blue-600 tracking-wide">
              Inventory Trackor
            </span>
          </div>
        </Link>

        <div className="space-x-1 sm:flex sm:space-x-4 sm:mr-4">
          {!isLoggedIn ? (
            <Link
            to={"/user/login"}
              onClick={handleLogin}
              className={`px-4 py-2 text-blue-600 rounded font-semibold hover:bg-blue-100 transition ${
                active ? "bg-blue-200" : ""
              }`}
            >
              SIGN-IN
            </Link>
          ) : (
            <Link
              to="/home/dashboard"
              className="px-4 py-2 text-blue-600 rounded font-semibold hover:bg-blue-100 transition"
            >
              Dashboard
            </Link>
          )}

          {!isLoggedIn ? (
            <Link
              to="/user/register"
              className="px-4 py-2 text-black-600 rounded font-semibold hover:bg-blue-600 hover:text-white transition"
            >
              SIGNUP
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-black-600 rounded font-semibold hover:bg-blue-600 hover:text-white transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
