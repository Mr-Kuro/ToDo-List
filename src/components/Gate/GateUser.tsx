import { useGetLoggedUser } from "@/store";
import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const GateUser = ({ children }: { children: React.ReactNode }) => {
  const { id } = useGetLoggedUser();
  const navigate = useNavigate();
  const loctition = useLocation();
  const path = loctition.pathname.split("/").pop();

  const unLoggedPaths = useMemo(() => new Set(["signin", "signup"]), []);

  useEffect(() => {
    document.title = path ?? "TodoList";

    if (id === 0) {
      if (unLoggedPaths.has(path as string)) return;
      navigate("/signin");
    }
  }, [path, id, navigate, unLoggedPaths, ]);

  return <>{children}</>;
};
