import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// import { GateUser } from "./components/routerGate/GateUser.tsx";
import { Header } from "./components/Header/Header.tsx";
import { CredentialsForm } from "./containers/Users";
import { TodoList } from "./containers/Todoes";
import { TodoCreate } from "./containers/Todoes/";
import App from "./App.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/signin",
        element: <CredentialsForm />,
      },
      {
        path: "/signup",
        element: <CredentialsForm />,
      },
      {
        path: "/todoes",
        element: <TodoList />,
      },
      {
        path: "todoes/create",
        element: <TodoCreate />,
      },
      {
        path: "/",
        element: <TodoList />,
      },
    ],
    errorElement: (
      <>
        <Header />
        <h1 className="text-center w-full mt-[5rem] text-red-500">
          404 - Not Found
        </h1>
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
