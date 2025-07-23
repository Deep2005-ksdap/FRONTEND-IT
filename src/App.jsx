import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegistrationPage";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import CreateStock from "./pages/CreateStock";
import LandingPage from './pages/LandingPage'
import NotFoundPage from "./pages/NotFoundPage";
import { useContext, useEffect } from "react";
import { Logic } from "./store/Context";

function App() {
  const navigate = useNavigate();
  const { dispatchLogin, isLoggedIn } = useContext(Logic);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/user/check-auth`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        if (res.ok && data.isLoggedIn) {
          dispatchLogin(true);
          navigate("/home/dashboard");
        } else {
          dispatchLogin(false);
          navigate("/")
        }
      } catch (err) {
        console.error("user can't be authenticated , try again", err);
      }
    };

    checkAuth();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index={true} element={<LandingPage />} />
        <Route path="home/dashboard" element={<Dashboard />} />
        <Route path="home/add-item" element={<CreateStock />} />
        <Route path="home/edit-item/:stockId" element={<CreateStock />} />
      </Route>
      <Route path="/user/login" element={<LoginPage />} />
      <Route path="/user/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
