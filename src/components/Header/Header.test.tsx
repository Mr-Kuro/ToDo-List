import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Header } from "./Header";
import { Router, RouterProps } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const navigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigate,
    Router: actual.Router,
  };
});

vi.mock("@/store", async () => {
  const actual = await vi.importActual("@/store");
  return {
    ...actual,
    useGetLoggedUser: () => mockedUserId,
    AppStore: () => mockedSignOut,
  };
});

const routerProps = {
  location: "/todoes",
  navigator: {
    navigate: navigate,
  },
} as unknown as RouterProps;

enum ButtonId {
  ADD_TODO = "add-todo",
  TODOES = "todoes",
  SIGN_OUT = "signout",
}

const mockedUserId = { id: 1 };
const mockedSignOut = vi.fn();

describe("Header", () => {
  describe("when user is logged", () => {
    beforeEach(() => {
      vi.clearAllMocks();
      render(
        <Router {...routerProps}>
          <Header />
        </Router>
      );
    });

    it("should render Header with active buttons", () => {
      const buttons = screen.getAllByRole("button");

      buttons.forEach((button) => {
        expect(button).toBeInTheDocument();
        expect(button).toBeEnabled();
      });
    });

    it("should navigate to /todoes/create when 'Add Todo' button is clicked", async () => {
      const buttons = screen.getByTestId(ButtonId.ADD_TODO);

      await userEvent.click(buttons);

      expect(navigate).toHaveBeenCalledWith("/todoes/create");
    });

    it("should navigate to /todoes when 'Todoes' button is clicked", async () => {
      const button = screen.getByTestId(ButtonId.TODOES);

      await userEvent.click(button);

      expect(navigate).toHaveBeenCalledWith("/todoes");
    });

    it("should logout user when 'Sign Out' button is clicked", async () => {
      const button = screen.getByTestId(ButtonId.SIGN_OUT);

      await userEvent.click(button);

      expect(mockedSignOut).toHaveBeenCalledWith(undefined);
    });
  });

  describe("when user is not logged", () => {
    beforeEach(() => {
      mockedUserId.id = 0;

      render(
        <Router {...routerProps}>
          <Header />
        </Router>
      );
    });

    it("should render Header with disabled buttons", () => {
      const buttons = screen.getAllByRole("button");

      buttons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });

    it("should test if 'Sign Out' button is not rendered", () => {
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBe(2);

      const button = screen.queryByTestId(ButtonId.SIGN_OUT);
      expect(button).not.toBeInTheDocument();
    });
  });
});
