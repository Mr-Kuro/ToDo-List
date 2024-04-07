import { SelectOptionProps } from "@/components/Form";

// todo types
export type TodoT = {
  id: number;
  userId: number;
  status: "checked" | "pending";
  title: string;
  message: string;
  timing: number | string;
};
export type TodoStatusT = TodoT["status"];

// users types
export type UserT = {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
};
export type LoggedUserT = Pick<UserT, "id" | "username">;

// DTOs
export type SignUpDTOT = Omit<UserT, "id">;
export type SignInDTOT = Pick<UserT, "username" | "password">;
export type TodoPropsT = TodoT & {
  notifierIn: SelectOptionProps;
};

// state types
export interface IState {
  todoList: TodoT[];
  usersList: UserT[];
  loggedUser: LoggedUserT;
}

// Store Actions Value Props
type TodoListActionsProps = {
  ADD_TODO: { todo: TodoT };
  TOGGLE_TODO: { id: number };
  REMOVE_TODO: { id: number };
};
type UsersListActionsProps = {
  SIGN_IN: { user: LoggedUserT };
  SIGN_UP: { user: UserT };
  SIGN_OUT: undefined;
  REMOVE_USER: { id: number };
};

export type StoreActionsProps = TodoListActionsProps & UsersListActionsProps;

// actions
export type TodoListActions = { [key in keyof TodoListActionsProps]: (payload: TodoListActionsProps[key]) => void };

export type UsersListActions = { [key in keyof UsersListActionsProps]: (payload: UsersListActionsProps[key]) => void };

export type StoreActions = TodoListActions & UsersListActions;

