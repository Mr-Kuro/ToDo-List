import { Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { GateUser } from "./components/Gate/GateUser";

function App() {
  return (
    <>
      <GateUser>
        <Header />
        <Outlet />
      </GateUser>
    </>
  );
}

export default App;
