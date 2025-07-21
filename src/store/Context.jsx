import { createContext, useEffect, useState } from "react";

export const Logic = createContext({
  isLoggedIn: false,
  serverData: null,
  setServerData: () => {},
  setIsLoggedIn: () => {},
  dispatchLogin: () => {},
  createStock: async () => {},
  dataOfUser: () => {},
});

const Context = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [serverData, setServerData] = useState(null);

  const dispatchLogin = (value) => {
    setIsLoggedIn(value);
  };

  console.log(isLoggedIn);
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
      dispatchLogin(true);
      setServerData(data || null);
    } catch (err) {
      console.log("error in fetching data, ", err);
    }
  };

  const createStock = async (
    itemname,
    itemprice,
    itemunits,
    itembrand,
    category,
    itemsize
  ) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/home/add-item`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          itemname,
          itemprice,
          itemunits,
          itembrand,
          category,
          itemsize,
        }),
      });

      const data = await res.json();
      console.log("Data after data adding", data);
      if (res.ok) {
        alert(data.message);
      }
    } catch (error) {
      console.log("error in creating the stock", error);
    }
  };

  const editStock = async (
    id,
    itemname,
    itemprice,
    itemunits,
    itembrand,
    category,
    itemsize
  ) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/home/edit-item/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            itemname,
            itemprice,
            itemunits,
            itembrand,
            category,
            itemsize,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
      }
    } catch (err) {
      console.log("Error in editing the item", err);
    }
  };

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
        createStock,
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
