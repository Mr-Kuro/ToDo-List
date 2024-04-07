import { useCallback, useEffect } from "react";
import { AppStore } from ".";
import { convertDate } from "./ultils";


export const useGetBiggestUserId = () => {
  const usersList = AppStore(({store}) => store.usersList);

  return usersList.length
    ? usersList.reduce((acc, user) => (user.id > acc ? user.id : acc), 0)
    : 0;
};

export const useGetLoggedUser = () => {
  return AppStore(({store}) => store.loggedUser);
};

// verify if user
export const useVerifyUser = () => {
  const usersList = AppStore(({store}) => store.usersList);

  const userNameExists = useCallback(
    (username: string) => {
      const user = usersList.find((user) => user.username === username);

      return user ? user : false;
    },
    [usersList]

  );


  const userExistsWithPassword = useCallback(
    (username: string, password: string) => {
      const user = usersList.find(
        (user) => user.username === username && user.password === password
      );

      return user ? user : false;
    },
    [usersList]
  );
  
  return { userNameExists, userExistsWithPassword };
};

// Todos
export const useGetBiggestTodoId = () => {
  const todoList = AppStore(({store}) => store.todoList);

  return todoList.length
    ? todoList.reduce((acc, todo) => (todo.id > acc ? todo.id : acc), 0)
    : 0;
};

export const useGetTodosPerUser = () => {
  const loggedUser = useGetLoggedUser();
  const todoList = AppStore(({store}) => store.todoList);
  return todoList.filter((todo) => todo.userId === loggedUser.id);
};

export const useGetTodosCount = () => {
  const todoList = useGetTodosPerUser();
  return todoList.length;
};

export const useVerifyTodo = () => {
  const todoList = useGetTodosPerUser();

  const todoExists = useCallback(
    (title: string) => {
      const todo = todoList.find((todo) => todo.title === title);

      return todo ? todo : false;
    },
    [todoList]
  );

  return { todoExists };
};

export const useNotifyUser = () => {
  const dispatch = AppStore((state) => state.actions.TOGGLE_TODO);
  const todoList = useGetTodosPerUser();
  const now = new Date().getTime();


  const notifyTodoExpired = useCallback(() => {
    console.log("notifyTodoExpired");

    todoList.forEach((todo) => {
      const {id,status,title} = todo

      const convertedTiming = convertDate(0, todo.timing as string).time;
      const timing = convertedTiming
      const distance = timing - now;

      if (distance < 0 && status === "pending") {
        dispatch({id});
        alert(`${title} Todo expired`);
      }
      return todo;
    });

    return false;
  }, [todoList, dispatch, now]);

  useEffect(() => {
    const interval = setInterval(() => {
      notifyTodoExpired();
    }, 1000);

    return () => clearInterval(interval);
  }, [notifyTodoExpired]);
};

