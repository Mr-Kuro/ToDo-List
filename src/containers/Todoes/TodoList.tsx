import { TodoT } from "@/models";

import { ScrollArea } from "@/components/ui/scroll-area";

import { TableComponent } from "@/components/Table/TableComponent";
import { AppStore, useGetTodosPerUser } from "@/store";
import { Link } from "react-router-dom";
import { dateCountdown } from "@/utils";
import { useNotifyUser } from "../../store/hooks";
import { useEffect, useState } from "react";
import { LucideCheckCheck, LucideTrash } from "lucide-react";

export const TodoList = () => {
  const { username } = AppStore(({ store }) => store.loggedUser);
  const { REMOVE_TODO, TOGGLE_TODO } = AppStore(({ actions }) => actions);
  useNotifyUser();

  const [useEfectState, setUseEfectState] = useState(true); // podemos refatorar e remover toda essa lógica de useEffect e useState

  useEffect(() => {
    const interval = setInterval(() => {
      setUseEfectState(!useEfectState);
      return () => clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [useEfectState]);

  const onRemoveNotification = ({ id }: TodoT) => {
    REMOVE_TODO({ id });
  };

  const onToggleTodo = ({ id }: TodoT) => {
    TOGGLE_TODO({ id });
  };

  const convertedTiming = (todo: TodoT) => {
    const value = dateCountdown(todo.timing as string);

    const refactoredValue = value === "expired" ? "0.0 s" : value;

    return `${refactoredValue}`;
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
            gridDisposition: "repeat(2, 1fr) 2fr 3fr 4rem",
            items: Object.keys({ ...todosPerUser[0], actions: 0 }).filter(
              (key) => key !== "id" && key !== "userId"
            ),
          }}
          tableRows={todosPerUser.map((todo) => ({
            ceil: [
              <p
                // text no wrap
                className="overflow-ellipsis"
              >
                {convertedTiming(todo)}
              </p>,
              <p
                style={{
                  color: todo.status === "Pending" ? "orange" : "lightgreen",
                }}
              >
                {todo.status}
              </p>,
              <ScrollArea className="h-8">{todo.title}</ScrollArea>,
              <ScrollArea className="h-8">
                {todo.message ? todo.message : "-"}
              </ScrollArea>,
              <div className="flex justify-center w-full items-center">
                <div>
                  <LucideTrash
                    onClick={() => onRemoveNotification(todo)}
                    cursor={"pointer"}
                    className="w-6 h-6 mx-2 text-red hover:text-red-500 transition-colors"
                  />
                </div>
                <div>
                  <LucideCheckCheck
                    onClick={() => onToggleTodo(todo)}
                    cursor={"pointer"}
                    className="w-8 h-8 hover:text-green-500 transition-colors"
                  />
                </div>
              </div>,
            ],
          }))}
        />
      )}
    </>
  );
};
