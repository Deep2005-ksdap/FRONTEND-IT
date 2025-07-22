import { createContext, useState } from "react";

export const Logic = createContext({
  isLoggedIn: false,
  serverData: null,
  setAllStock: () => {},
  LoggedInStatus: async () => {},
  setServerData: () => {},
  setIsLoggedIn: () => {},
  dispatchLogin: () => {},
  editItemHandler: async () => {},
  createStock: async () => {},
  dataOfUser: async () => {},
});

const Context = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [serverData, setServerData] = useState(null);
  const [allStock, setAllStock] = useState();

  const dispatchLogin = (value) => {
    setIsLoggedIn(value);
  };

  console.log(isLoggedIn);
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
      if (res.ok) {
        dispatchLogin(true);
      }
      return data;
    } catch (error) {
      alert("Login err");
      console.error();
      "Login error", error;
    }
  };

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
      if (res.ok) {
        setServerData(data || null);
        setAllStock(data?.data.allStock);
      }
      return data;
    } catch (err) {
      console.error("error in fetching data, ", err);
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
    } catch (error) {
      console.error("error in creating the stock");
    }
  };

  const editItemHandler = async (
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
      console.error("Error in editing the item", err);
    }
  };

  return (
    <Logic.Provider
      value={{
        isLoggedIn,
        serverData,
        allStock,
        setAllStock,
        createStock,
        LoggedInStatus,
        editItemHandler,
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
