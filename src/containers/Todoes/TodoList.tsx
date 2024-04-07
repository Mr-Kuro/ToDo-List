import { TodoT } from "@/models";

import { ScrollArea } from "@/components/ui/scroll-area";

import { TableComponent } from "@/components/Table/TableComponent";
import {
  AppStore,
  useGetTodosPerUser,
} from "@/store";
import { Link } from "react-router-dom";
import { countDownDate } from "@/store/ultils";
import { useNotifyUser } from "../../store/hooks";
import { useEffect, useState } from "react";

export const TodoList = () => {
  const { username } = AppStore(({store}) => store.loggedUser);
  const {REMOVE_TODO, TOGGLE_TODO} = AppStore(({actions}) => actions)
  useNotifyUser();

  const [useEfectState, setUseEfectState] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setUseEfectState(!useEfectState);
    }, 1000);

    return () => clearInterval(interval);
  }, [useEfectState]);

  const onRemoveNotification = ({id}: TodoT) => {
    REMOVE_TODO({id});
  };

  const onToggleTodo = ({id}: TodoT) => {
    TOGGLE_TODO({id});
  };

  const convertedTiming = (todo: TodoT) => {
    const { value, label } = countDownDate(todo.timing as string);

    const refactoredValue =
      label === "expired"
        ? "0.0"
        : label === "ss"
        ? value.toFixed(0)
        : value.toFixed(2);

    return `${refactoredValue} ${label === "expired" ? "" : `- ${label}`}`;
  };

  const todosPerUser = useGetTodosPerUser();
  return (
    <>
      {todosPerUser.length === 0 ? (
        <h1 className="text-center w-full mt-[5rem] underline">
          <Link to={"/todoes/create"}>Add a new ToDo...</Link>
        </h1>
      ) : (
        <TableComponent
          title={`Hello, ${username}! Here are your ToDoList:`}
          tableHeaders={{
            gridDisposition: "repeat(2, 1fr) 2fr 3fr 3rem",
            items: Object.keys({ ...todosPerUser[0], actions: 0 }).filter(
              (key) => key !== "id" && key !== "userId"
            ),
          }}
          tableRows={todosPerUser.map((todo) => ({
            ceil: [
              <p>{convertedTiming(todo)}</p>,
              <p
                style={{
                  color: todo.status === "pending" ? "orange" : "lightgreen",
                }}
              >
                {todo.status}
              </p>,
              <ScrollArea className="h-8">{todo.title}</ScrollArea>,
              <ScrollArea className="h-8">
                {todo.message ? todo.message : "-"}
              </ScrollArea>,
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                <button onClick={() => onRemoveNotification(todo)}>🗑️</button>
                <button onClick={() => onToggleTodo(todo)}>✅</button>
              </div>,
            ],
          }))}
        />
      )}
    </>
  );
};
