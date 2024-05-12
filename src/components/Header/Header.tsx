import { AppStore, useGetLoggedUser } from "@/store";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@radix-ui/react-navigation-menu";
import { LinkButton } from "./components";

export const Header = () => {
  const dispatch = AppStore((state) => state.actions.SIGN_OUT);
  const { id } = useGetLoggedUser();

  const buttonProps = {
    disabled: id === 0,
    className: "bg-transparent text-black hover:bg-gray-100 p-2",
  };

  const gridTC = id ? "grid-cols-3" : "grid-cols-2";

  return (
    <header className="flex justify-around flex-wrap items-center shadow-sm gap-2 p-4 dark:bg-gray-800 z-10 top-0 left-0">
      <h1 className="text-xl font-bold">Todo List</h1>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem
            className={`grid ${gridTC} gap-2 w-fit text-nowrap min-w-[12rem]`}
          >
            <LinkButton
              {...buttonProps}
              testId="add-todo"
              text="Add Todo"
              linkTo="/todoes/create"
            />

            <LinkButton
              testId="todoes"
              {...buttonProps}
              text="Todoes"
              linkTo="/todoes"
            />

            {id ? (
              <LinkButton
                {...buttonProps}
                text="Sign Out"
                testId="signout"
                disabled={false}
                onClick={() => {
                  dispatch(undefined);
                }}
              />
            ) : null}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
