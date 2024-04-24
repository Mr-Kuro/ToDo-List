import { useNavigate } from "react-router-dom";
import { AppStore, useGetLoggedUser } from "@/store";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@radix-ui/react-navigation-menu";

import { Button } from "../ui/button";

type linkButtonProps = {
  text: string;
  linkTo?: string;
  disabled: boolean;
  onClick?: () => void;
};

const LinkButton = ({ text, linkTo, ...props }: linkButtonProps) => {
  const handleClick = useNavigate();

  return (
    <Button
      {...props}
      onClick={() => {
        if (linkTo) {
          handleClick(linkTo);
        } else {
          props.onClick && props.onClick();
        }
      }}
      className={`bg-transparent text-black hover:bg-gray-100 p-0 m-0 h-fit w-fit`}
    >
      <p className="p-2">{text}</p>
    </Button>
  );
};

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
              text="Add Todo"
              linkTo="/todoes/create"
            />

            <LinkButton {...buttonProps} text="Todoes" linkTo="/todoes" />

            {id ? (
              <LinkButton
                {...buttonProps}
                text="Sign Out"
                disabled={false}
                onClick={() => {
                  dispatch(undefined);
                }}
              ></LinkButton>
            ) : null}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
