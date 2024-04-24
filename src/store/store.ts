import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { IState, StoreActions } from "../models/types";
import { dateConversor } from "../utils/auxiliary-functions";

// initialState < initial state of the store >
export const initialState: IState = {
  todoList: [
    {
      id: 1,
      userId: 1,
      timing: "Mar 11, 2024 17:37:25",
      status: "Pending",
      title:
        "This is the first todo and it is a long title for a the first todo",
      message:
        "This is longer message for the first todo, and there is no any other todo messages longer than this one",
    },
    {
      id: 2,
      userId: 1,
      timing: dateConversor(60000000).localeString,
      status: "Checked",
      title: "This is the second todo",
      message: "This is a middle message for the second todo",
    },
    {
      id: 3,
      userId: 1,
      timing: dateConversor(120000).localeString,
      status: "Checked",
      title: "This is the third todo, and it is a middle title",
      message: "This is a short message",
    },
    {
      id: 4,
      userId: 1,
      timing: "Mar 13, 2024 17:37:25",
      status: "Checked",
      title: "Beep",
      message: "beep",
    },
    {
      id: 5,
      userId: 1,
      timing: dateConversor(60000).localeString,
      status: "Checked",
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
  devtools(
    persist(
      immer((set) => ({
        store: initialState,
        actions: {
          // Todos
          ADD_TODO: ({ todo }) =>
            set((state) => {
              state.store.todoList.push(todo);
            }),

          TOGGLE_TODO: ({ id }) =>
            set((state) => {
              const todo = state.store.todoList.find((todo) => todo.id === id);
              if (todo) {
                todo.status = todo.status === "Pending" ? "Checked" : "Pending";
              }
            }),

          REMOVE_TODO: ({ id }) =>
            set((state) => {
              const index = state.store.todoList.findIndex(
                (todo) => todo.id === id
              );
              if (index !== -1) {
                state.store.todoList.splice(index, 1);
              }
            }),

          // Users
          REMOVE_USER: ({ id }) =>
            set((state) => {
              const index = state.store.usersList.findIndex(
                (user) => user.id === id
              );
              if (index !== -1) {
                state.store.usersList.splice(index, 1);
              }
            }),

          SIGN_IN: ({ user }) =>
            set((state) => {
              state.store.loggedUser = user;
            }),

          SIGN_UP: ({ user }) =>
            set((state) => {
              state.store.usersList.push(user);
            }),

          SIGN_OUT: () =>
            set((state) => {
              state.store.loggedUser = initialState.loggedUser;
            }),
        },
      })),
      {
        name: "todo-list-store",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(([key]) => !["actions"].includes(key))
          ),
      }
    )
  )
);