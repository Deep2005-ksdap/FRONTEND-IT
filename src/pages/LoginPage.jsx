import { useState } from "react";
import { useContext } from "react";
import "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import Context, { Logic } from "../store/Context";

const LoginPage = () => {
  const { dispatchLogin } = useContext(Logic);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("")

  const LoggedInStatus = async (email, password) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setErr(data.message)
      console.log("data after login", data);
      if (res.ok) {
        dispatchLogin(true);
        navigate("/home/dashboard");
      }
    } catch (error) {
      console.log("Login error", error);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    await LoggedInStatus(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="bg-[url(../../../public/loginInventoryTrackor.jpg)] min-h-screen bg-cover">
      <div className="h-full flex flex-col gap-4 justify-center items-center min-h-screen px-2 py-2 min-w-[350px] sm:min-w-[450px] ">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Login to your <u>INVENTORY</u>
        </h1>
        {err && <div className="font-extrabold">
            <p className="text-red-600 bg-yellow-400 px-4 py-2 rounded-lg">- {err}</p>
          </div>
        }
        <form
          onSubmit={(e) => loginHandler(e)}
          className="border max-w-[1000px] min-w-[300px] rounded-xl flex flex-col backdrop-blur-xl border-white items-center mt-2 px-2 py-4 hover:border-green-500 hover:shadow-xl hover:shadow-gray-700"
        >
          <div className="flex flex-col p-4 w-full mb-4 mt-2 gap-4">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              name="email"
              placeholder="eg. test@example.com"
            />

            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              name="password"
              placeholder="eg. 123456"
            />
          </div>

          <div className="mb-1 text-left w-full">
            ~New uesr?
            <p>
              <a className="text-blue-600 px-3" href="/user/register">
                REGISTER yourself
              </a>{" "}
            </p>
          </div>
          <button className="bg-green-500 font-bold text-white w-25 mb-2 py-2 cursor-pointer rounded-[10px] inline hover:bg-green-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
