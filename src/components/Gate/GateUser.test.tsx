import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { GateUser } from "./GateUser";
import { Navigator, Router } from "react-router-dom";

const navigate = vi.fn();
const locate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigate,
    useLocation: () => locate(),
  };
});

const navigations = {
  navigate: navigate,
} as unknown as Navigator;

const mockedChildren = <div>{"Hello, World!"}</div>;

let mockedUserId = { id: 1 };

describe("GateUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mock("@/store", async () => {
      const actual = await vi.importActual("@/store");
      return {
        ...actual,
        useGetLoggedUser: () => mockedUserId,
      };
    });
  });

  it("should not redirect to /signin when user is logged", () => {
    locate.mockReturnValueOnce({ pathname: "/todoes" });

    const callback = vi.fn();
    render(
      <Router location={"/"} navigator={navigations}>
        <GateUser callback={callback}>{mockedChildren}</GateUser>
      </Router>
    );

    expect(locate).toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });

  it("should redirect to /signin when user is not logged", () => {
    locate.mockReturnValueOnce({ pathname: "/todoes" });
    mockedUserId = { id: 0 };
    const callback = vi.fn();
    render(
      <Router location={"/"} navigator={navigations}>
        <GateUser callback={callback}>{mockedChildren}</GateUser>
      </Router>
    );

    expect(callback).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith("/signin");
  });

  it("should not redirect to /signin when path is authorized for unlogged users", () => {
    locate.mockReturnValueOnce({ pathname: "/signin" });

    const callback = vi.fn();
    render(
      <Router location={"/"} navigator={navigations}>
        <GateUser callback={callback}>{mockedChildren}</GateUser>
      </Router>
    );

    expect(locate).toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });

  it("should render the document title by the path", () => {
    locate.mockReturnValueOnce({ pathname: "/todoes/create" });

    render(
      <Router location={"/todoes"} navigator={navigations}>
        <GateUser>{mockedChildren}</GateUser>
      </Router>
    );

    expect(document.title).toBe("Todo List - create");
  });

  it("should render the default document title when path is empty", () => {
    locate.mockReturnValueOnce({ pathname: "" });

    render(
      <Router location={"/"} navigator={navigations}>
        <GateUser>{mockedChildren}</GateUser>
      </Router>
    );

    expect(document.title).toBe("Todo List");
  });
});
