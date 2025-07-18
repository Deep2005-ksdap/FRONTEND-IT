import { useContext } from "react";
import { Logic } from "../store/logic";
import { Link, Outlet, useLocation } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import NotFoundPage from "./NotFoundPage";

const Dashboard = () => {
  const { stock, isLoggedIn, deleteById } = useContext(Logic);
  const location = useLocation();

  // Check if on /dashboard exactly (not on nested route)
  const isDashboardRoot = location.pathname === "/home/dashboard";

  const groupedStock = stock.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item); // if item have category which is obvious from the context than it will all array of item will pushed to that category in the accumulator
    return acc;
  }, {});

  return (
    <main className="min-h-screen px-2 sm:px-4 py-6 flex flex-col items-center bg-gradient-to-r from-blue-100 via-white to-green-100">
      {!isLoggedIn && (
        <>
          <h1 className="mb-2 text-2xl sm:text-3xl font-extrabold text-blue-700 text-center">
            Welcome, <span className="text-green-600">"xyz"</span>
          </h1>
          <p className="mb-6 text-base sm:text-lg text-gray-700 text-center">
            Here are your stock listed:
          </p>
          <div className="w-full max-w-4xl space-y-8">
            {stock.length === 0 ? (
              <div className="font-semibold font-gra px-6 py-10 text-center rounded-xl shadow">
                <p className="bg-gradient-to-r from-blue-600  to-green-800 text-2xl bg-clip-text text-transparent inline-block">
                  Your inventory is empty. Start adding items!
                </p>
              </div>
            ) : (
              Object.keys(groupedStock).map((category, idx) => (
                <div key={idx} className="py-2">
                  <h2 className="text-lg sm:text-xl font-bold text-blue-600 mb-2">
                    Category: <span className="capitalize">{category}</span>
                  </h2>
                  <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-blue-100">
                          <th className="px-4 py-3 font-semibold text-gray-700">
                            Item Name
                          </th>
                          <th className="px-4 py-3 font-semibold text-gray-700">
                            Price
                          </th>
                          <th className="px-2 py-3 font-semibold text-gray-700">
                            Units
                          </th>
                          {category === "electronics" && (
                            <th className="px-1 py-3 font-semibold text-gray-700">
                              Brand
                            </th>
                          )}
                          {category === "clothing" && (
                            <th className="px-4 py-3 font-semibold text-gray-700">
                              Size
                            </th>
                          )}
                          <th className="px-1 py-3"></th>
                          <th className="px-1 py-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupedStock[category].map((item, index) => (
                          <tr
                            key={index}
                            className="border-t hover:bg-blue-50 transition"
                          >
                            <td className="px-4 py-3">
                              <span className="text-blue-600 font-bold">
                                {item.itemName}
                              </span>
                            </td>
                            <td className="px-4 py-3">₹{item.itemPrice}</td>
                            <td className="px-2 py-3">{item.itemUnits}</td>
                            {category === "electronics" && (
                              <td className=" py-3">{item.itemBrand}</td>
                            )}
                            {category === "clothing" && (
                              <td className="px-4 py-3">{item.itemSize}</td>
                            )}
                            <td className="px-1 py-3 cursor-pointer text-blue-400 hover:text-blue-800 transition text-xl">
                              <FaEdit />
                            </td>
                            <td
                              className="px-1 py-3 cursor-pointer text-red-400 hover:text-red-800 transition text-xl"
                              onClick={() =>
                                deleteById(stock.findIndex((i) => i === item))
                              }
                            >
                              <MdDeleteForever />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="w-full flex justify-end max-w-4xl mt-6">
            <Link
              to="/home/add-item"
              className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-white hover:text-red-600 hover:border hover:border-red-500 transition"
            >
              + Add Items
            </Link>
          </div>
        </>
      )}
      <Outlet />
    </main>
  )
};

export default Dashboard;
