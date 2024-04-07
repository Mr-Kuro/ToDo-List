import { SelectOptionProps } from "@/components/Form";

export const STORE_ACTIONS = {
  ADD_TODO: "ADD_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  REMOVE_TODO: "REMOVE_TODO",
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP",
  SIGN_OUT: "SIGN_OUT",
  REMOVE_USER: "REMOVE_USER",
};

export const TIMING_OPT: SelectOptionProps = {
  options: [
    { value: 1000, label: "seconds", disabled: false, selected: true },
    { value: 60000, label: "minutes", disabled: false, selected: false },
    { value: 3600000, label: "hours", disabled: false, selected: false },
    { value: 86400000, label: "days", disabled: false, selected: false },
  ],
  selected: 1000,
};