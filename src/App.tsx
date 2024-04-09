import { Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { GateUser } from "./components/Gate/GateUser";
import { FloatingIcon } from "./components/FloatingIcon/FloatingIcon";
import { useState } from "react";

function App() {
  const [allowed, setallowed] = useState(false);

  return (
    <>
      <GateUser callback={(value) => setallowed(value)}>
        <Header />
        <FloatingIcon enabled={allowed} />
        <Outlet />
      </GateUser>
    </>
  );
}

export default App;
