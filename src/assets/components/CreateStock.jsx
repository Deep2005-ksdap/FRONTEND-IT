import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateStock = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  const itemNameElement = useRef();
  const itemPriceElement = useRef();
  const itemUnitsElement = useRef();
  const itemBrandElement = useRef();
  const itemSizeElement = useRef();

  const handleData = (event) => {
    event.preventDefault();

    const itemName = itemNameElement.current.value;
    const itemPrice = itemPriceElement.current.value;
    const itemUnits = itemUnitsElement.current.value;
    const itemBrand =
      category === "electronics" ? itemBrandElement.current.value : "";
    const itemSize =
      category === "clothing" ? itemSizeElement.current.value : "";

    createStock(itemName, itemPrice, itemUnits, itemBrand, itemSize);

    itemNameElement.current.value = "";
    itemPriceElement.current.value = "";
    itemUnitsElement.current.value = "";
    navigate("/dashboard");
  };
  console.log("category is :", category);

  return (
    <div className="min-h-screen flex justify-center items-center bg-white shadow bg-gradient-to-r from-blue-100 via-white to-green-100">
      <div className="w-[70%] border-white border-2 p-4 rounded-2xl hover:shadow-xl  ">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          ADD Stock
        </h2>

        <form
          method="POST"
          action="/home/add-item"
          onSubmit={handleData}
          className="px-2"
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Item Name</label>
            <select
              name="category"
              onChange={(event) => {
                console.log(event.target.value);
                setCategory(event.target.value);
              }}
              id="category"
              className="w-full py-2 *border rounded-md outline focus:outline-none cursor-pointer"
            >
              <option value="" disabled>
                Select from here
              </option>
              <option value="groceries">Groceries</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Item Name</label>
            <input type="text" ref={itemNameElement} placeholder="eg. Chips" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Item Price (₹)</label>
            <input type="number" ref={itemPriceElement} placeholder="eg. 499" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Unit</label>
            <input type="number" ref={itemUnitsElement} placeholder="eg. 10" />
          </div>

          {category === "electronics" && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Brand Name</label>
              <input
                type="text"
                ref={itemBrandElement}
                placeholder="eg. XYZ company"
              />
            </div>
          )}

          {category === "clothing" && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Size</label>
              <input type="text" ref={itemSizeElement} placeholder="eg. M" />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStock;
