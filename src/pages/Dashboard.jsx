import { useContext, useEffect } from "react";
import { Logic } from "../store/Context";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Dashboard = () => {
  const { serverData, dataOfUser } = useContext(Logic);

  useEffect(() => {
    dataOfUser();
  }, []);

  const ownerName = serverData ? serverData.data.username.firstname : "USER";
  let lowStockItemsCount,
    totalStockValue = 0;
  let lowStockItemName = [];
  if (serverData) {
    lowStockItemName = serverData.data.lowStockItems.map(
      (item) => item.itemname
    );
    lowStockItemsCount = serverData.data.lowStockItemsCount;
    totalStockValue = serverData.data.totalStockValue;
  }

  const dataArray = serverData
    ? serverData.data.allStock.reduce((acc, item) => {
        const { category } = item;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(item);
        return acc;
      }, {})
    : {};

  return (
    <main className="flex flex-col items-center  min-h-screen w-auto bg-gradient-to-r from-blue-100 via-white to-green-100 px-4 py-4 text-center">
      <h1 className="text-2xl mb-4 font-bold text-blue-500">
        Welcome,
        <span className="font-extrabold text-3xl text-green-500">
          "{ownerName}"
        </span>
      </h1>
      <ol className="flex w-full flex-col gap-2 px-6 py-4 text-gray-700 bg-blue-100 rounded-2xl text-left font-medium mb-6">
        <li className="flex justify-between items-center font-bold">
          <span>Total value of Your Inventory:</span>
          <span className="text-green-700">₹{totalStockValue}</span>
        </li>
        <li className="flex justify-between items-center">
          <span>No. of Items less than 5 Units:</span>
          <span className="text-red-500 font-bold">{lowStockItemsCount}</span>
        </li>
        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <span>Item names of low STOCK:</span>
          <span className="text-blue-600 font-bold break-words">
            {Array.isArray(lowStockItemName) && lowStockItemName.length > 0
              ? lowStockItemName.join(", ")
              : "None"}
          </span>
        </li>
      </ol>
      {Object.entries(dataArray).length === 0 ? (
        <div className="font-semibold px-6 py-10 text-center">
          YOUR Inventory is Empty, Start adding items!
        </div>
      ) : (
        Object.entries(dataArray).map(([category, items]) => (
          <div
            key={category}
            className="max-w-[900px] flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 via-white to-green-100 m-4 border-white border-2 rounded-lg hover:shadow-lg hover:shadow-gray-500"
          >
            <h2 className="font-bold text-xl mt-2 text-red-400">
              Category: {category}
            </h2>
            <div className="m-4 w-full">
              <table className="table-fixed w-full mt-4 px-4 py-4 text-left">
                <thead className="text-gray-500 font-medium border-b-2 border-gray-300">
                  <tr className="text-center">
                    <th className="px-4 py-2">Item</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Units</th>
                    {category === "electronics" && (
                      <th className="px-4 py-2">Brand</th>
                    )}
                    {category === "clothing" && (
                      <th className="px-4 py-2">Size</th>
                    )}
                    <th className="px-4 py-2">Edit</th>
                    <th className="px-4 py-2">Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item, index) => (
                    <tr className="text-center" key={index}>
                      <td className="font-bold text-blue-600 px-4 py-2">
                        {item.itemname}
                      </td>
                      <td className="font-bold px-4 py-2">{item.itemprice}</td>
                      <td className="font-bold px-4 py-2">{item.itemunits}</td>
                      {item.category === "electronics" && (
                        <td className="font-bold px-4 py-2">
                          {item.itembrand}
                        </td>
                      )}
                      {item.category === "clothing" && (
                        <td className="font-bold px-4 py-2">{item.itemSize}</td>
                      )}
                      <td className="text-blue-500 text-xl hover:text-blue-700 hover:cursor-pointer px-4 py-2 flex justify-center">
                        <FaEdit />
                      </td>
                      <td className="text-red-500 text-xl hover:text-red-700 hover:cursor-pointer px-4 py-2 item-center">
                        <div className="flex justify-center">
                          <MdDeleteForever />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
      <div className="w-full  flex justify-end max-w-4xl mt-6 mr-6">
        <Link
          to="/home/add-item"
          className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-white hover:text-red-600 hover:border hover:border-red-500 transition"
        >
          + Add Items
        </Link>
      </div>
    </main>
  );
};

export default Dashboard;
