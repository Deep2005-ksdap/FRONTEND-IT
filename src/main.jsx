import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Context from "./store/Context.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Context>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context>
);
