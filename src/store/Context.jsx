import { createContext, useEffect, useState } from "react";

export const Logic = createContext({
  isLoggedIn: false,
  serverData: null,
  setServerData: () => {},
  setIsLoggedIn: () => {},
  dispatchLogin: () => {},
  dataOfUser: () => {},
});

const Context = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [serverData, setServerData] = useState(null);

  const dispatchLogin = (value) => {
    setIsLoggedIn(value);
  };

  console.log(isLoggedIn)
  const dataOfUser = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/home/dashboard`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      dispatchLogin(true)
      setServerData(data || null);
    } catch (err) {
      console.log("error in fetching data, ", err);
    }
  };
  console.log(isLoggedIn)

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     try {
  //       const res = await LoggedInStatus();
  //       console.log("res status is ", res);
  //       if (res.status === 200) {
  //         setIsLoggedIn(true);
  //       } else {
  //         setIsLoggedIn(false);
  //       }
  //     } catch (error) {
  //       console.log("Auto login check error", err);
  //       setIsLoggedIn(false);
  //     }
  //   };

  //   checkLogin();
  // }, []);
  // console.log("logged in status", isLoggedIn);
 
  return (
    <Logic.Provider
      value={{
        isLoggedIn,
        serverData,
        setIsLoggedIn,
        setServerData,
        dispatchLogin,
        dataOfUser,
      }}
    >
      {children}
    </Logic.Provider>
  );
};

export default Context;
