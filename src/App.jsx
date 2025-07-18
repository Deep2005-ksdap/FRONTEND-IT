import "./App.css"
import ContextProvider from "./assets/store/logic";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <ContextProvider>
        <Outlet />
      </ContextProvider>
    </>
  );
}

export default App;
