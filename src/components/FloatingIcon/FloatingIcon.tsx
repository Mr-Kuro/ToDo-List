import { useGetTodosCount, useGetTodosPerUser } from "@/store";
import { useIsMobile } from "@/utils/hooks";
import { useState } from "react";

export const FloatingIcon = ({ enabled }: { enabled: boolean }) => {
  const isMobile = useIsMobile();

  const [isOpened, setIsOpened] = useState(false);

  const numberOfTodos = useGetTodosCount();
  const lastThreeTodos = useGetTodosPerUser(3);

  const dynamicWidth = isMobile ? "w-12 h-12" : "w-16 h-16";

  const dynamicClasses = isOpened
    ? "rounded-lg bg-white p-4"
    : `rounded-full rounded-br-none text-white bg-black bg-opacity-50 ${dynamicWidth}`;

  return (
    enabled &&
    numberOfTodos > 0 && (
      <article
        className={`fixed bottom-3 right-3 shadow-2xl z-50 ${dynamicClasses}`}
      >
        <div className="relative">
          <button
            className="inset-0 absolute"
            onClick={() => setIsOpened(true)}
            onBlur={() => setIsOpened(false)}
          ></button>
          <div>
            {isOpened ? (
              <div>
                <h2 className="text-lg font-bold">Últimas tarefas</h2>
                <ol className="list-disc pl-4">
                  {lastThreeTodos.map((todo) => (
                    <li
                      className={`text-sm text-gray-700 py-1 pl-2 ${
                        todo.status === "checked" ? "line-through" : ""
                      }`}
                      key={todo.id}
                    >
                      {todo.title}
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <p className="flex text-xl justify-center mt-3 gap-2">
                <span>{numberOfTodos}</span>
                <span className="text-sm bg-white p-[0.025] rounded-full w-1 h-2 rotate-[-45deg]"></span>
              </p>
            )}
          </div>
        </div>
      </article>
    )
  );
};
