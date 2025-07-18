import { createContext, Children, useState, useReducer } from "react";

export const Logic = createContext({
  isLoggedIn: false,
  dispatchIsLoggedIn: () => {},
  deleteById: () => {},
  setCategory: () => {},
  stock: [],
});

const initialStock = [
  {
    itemName: "Biscuit",
    itemPrice: 20,
    itemUnits: 20,
    category: "groceries",
  },
  {
    itemName: "chips",
    itemPrice: 10,
    itemUnits: 5,
    category: "groceries",
  },
  {
    itemName: "Washing Machine",
    itemPrice: 9999,
    itemUnits: 2,
    itemBrand: "Godrej",
    category: "electronics",
  },

  {
    itemName: "Jeans ",
    itemPrice: 600,
    itemUnits: 2,
    itemSize: "M",
    category: "clothing",
  },
];

const stockReducer = (stock, action) => {
  switch (action.type) {
    case "DELETE_ITEM":
      return stock.filter((item, indexVal) => action.payload !== indexVal);

    case "CREATE-STOCK":
      return (stock = [action.payload, ...stock]);

    default:
      return stock;
  }
};

const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stock, dispatchStock] = useReducer(stockReducer, initialStock);
  const [category, setCategory] = useState("");

  const deleteById = (index) => {
    dispatchStock({ type: "DELETE_ITEM", payload: index });
  };

  const createStock = (itemName, itemPrice, itemUnits, itemBrand, itemSize) => {
    dispatchStock({
      type: "CREATE-STOCK",
      payload: {
        itemName,
        itemPrice,
        itemUnits,
        category,
        itemBrand,
        itemSize,
      },
    });
  };

  return (
    <Logic.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        stock,
        deleteById,
        createStock,
        setCategory,
        category,
      }}
    >
      {children}
    </Logic.Provider>
  );
};

export default ContextProvider;
