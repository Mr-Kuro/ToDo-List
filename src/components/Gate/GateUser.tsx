import { useGetLoggedUser } from "@/store";
import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type GateUserProps = {
  callback?: (value: boolean) => void;
  children: React.ReactNode;
};

export const GateUser = ({ callback, children }: GateUserProps) => {
  const { id } = useGetLoggedUser();
  const navigate = useNavigate();
  const loctition = useLocation();
  const path = loctition.pathname.split("/").pop();

  const unLoggedPaths = useMemo(() => new Set(["signin", "signup"]), []);

  useEffect(() => {
    document.title = path ?? "TodoList";

    if (id === 0) {
      if (unLoggedPaths.has(path as string)) return;
      callback && callback(false);
      navigate("/signin");
    } else {
      callback && callback(true);
    }
  }, [path, id, navigate, unLoggedPaths, callback]);

  return <>{children}</>;
};
