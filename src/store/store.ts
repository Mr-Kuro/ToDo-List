import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { IState, StoreActions } from "../models/types";
import { convertDate } from "./ultils";

// initialState < initial state of the store >
export const initialState: IState = {
  todoList: [
    {
      id: 1,
      userId: 1,
      timing: "Mar 11, 2024 17:37:25",
      status: "pending",
      title:
        "This is the first todo and it is a long title for a the first todo",
      message:
        "This is longer message for the first todo, and there is no any other todo messages longer than this one",
    },
    {
      id: 2,
      userId: 1,
      timing: convertDate(60000000).localeString,
      status: "checked",
      title: "This is the second todo",
      message: "This is a middle message for the second todo",
    },
    {
      id: 3,
      userId: 1,
      timing: convertDate(120000).localeString,
      status: "checked",
      title: "This is the third todo, and it is a middle title",
      message: "This is a short message",
    },
    {
      id: 4,
      userId: 1,
      timing: "Mar 13, 2024 17:37:25",
      status: "checked",
      title: "Beep",
      message: "beep",
    },
    {
      id: 5,
      userId: 1,
      timing: convertDate(60000).localeString,
      status: "checked",
      title: "pouca coisa",
      message: "pouca coisa mesmo, e uma tarefa bastante simples",
    },
  ],

  usersList: [
    {
      id: 1,
      name: "Eren Yeager",
      username: "erenJaeger8",
      email: "otita@marley.erwim",
      password: "erenJaeger8",
    },
    {
      id: 2,
      name: "Levi Ackerman",
      username: "leviAckerman8",
      email: "demon@marley.erwim",
      password: "leviAckerman8",
    },
  ],
  loggedUser: {
    id: 0,
    username: "",
  },
};

// store < store creator >
export const AppStore = create<{ store: IState; actions: StoreActions }>()(
  devtools((set) => ({
    store: initialState,
    actions: {
      // Todos
      ADD_TODO: ({ todo }) =>
        set((state) => ({
          store: {
            ...state.store,
            todoList: [...state.store.todoList, todo],
          },
        })),

      TOGGLE_TODO: ({ id }) =>
        set((state) => ({
          store: {
            ...state.store,
            todoList: state.store.todoList.map((todo) =>
              todo.id === id
                ? { ...todo, status: todo.status === "pending" ? "checked" : "pending" }
                : todo
            ),
          },
        })),

      REMOVE_TODO: ({ id }) =>
        set((state) => ({
          store: {
            ...state.store,
            todoList: state.store.todoList.filter((todo) => todo.id !== id),
          },
        })),

      // Users
      REMOVE_USER: ({ id }) =>
        set((state) => ({
          store: {
            ...state.store,
            usersList: state.store.usersList.filter((user) => user.id !== id),
          },
        })),

      SIGN_IN: ({ user }) =>
        set((state) => ({
          store: {
            ...state.store,
            loggedUser: user,
          },
        })),

      SIGN_UP: ({ user }) =>
        set((state) => ({
          store: {
            ...state.store,
            usersList: [...state.store.usersList, user],
          },
        })),

      SIGN_OUT: () =>
        set((state) => ({
          store: {
            ...state.store,
            loggedUser: initialState.loggedUser,
          },
        })),
    },
  }))
);