import { describe, it, vi, expect } from "vitest";
import { FloatingIcon } from "./FloatingIcon";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

// Inicialize a variável mockedIsMobile antes de usá-la

vi.mock("@/utils", () => {
  return {
    useIsMobile: () => mockedIsMobile(),
  };
});

vi.mock("@/store", async () => {
  const actual = await vi.importActual("@/store");
  return {
    ...actual,
    useGetTodosCount: () => mockNumberOfTodos,
    useGetTodosPerUser: () => mockListOfTodos,
  };
});

const mockedIsMobile = vi.fn();

const mockListOfTodos = [
  { id: 1, title: "Todo 1", status: "Checked" },
  { id: 2, title: "Todo 2", status: "Unchecked" },
  { id: 3, title: "Todo 3", status: "Unchecked" },
];
let mockNumberOfTodos = 3;

describe("FloatingIcon", () => {
  it("should not render when enabled is false", () => {
    render(<FloatingIcon enabled={false} />);

    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });

  it("should render when enabled is true", () => {
    render(<FloatingIcon enabled={true} />);

    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("should render with correct number of todos", () => {
    render(<FloatingIcon enabled={true} />);

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("should render the list of todos when opened", async () => {
    render(<FloatingIcon enabled={true} />);

    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByText("Últimas tarefas")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("should render with class w-16 h-16 when isMobile is false", () => {
    mockedIsMobile.mockReturnValue(false);

    render(<FloatingIcon enabled={true} />);

    expect(screen.getByRole("article")).toHaveClass(" w-16 h-16");
  });

  it("should render with class w-12 h-12 when isMobile is true", () => {
    mockedIsMobile.mockReturnValue(true);

    render(<FloatingIcon enabled={true} />);

    expect(screen.getByRole("article")).toHaveClass("w-12 h-12");
  });

  it("should style list item with line-through when todo is checked", async () => {
    render(<FloatingIcon enabled={true} />);

    const listItems = await screen.queryAllByRole("listitem");

    listItems.forEach((item) => {
      if (item.textContent === "Todo 1") {
        expect(item).toHaveClass("line-through");
      } else {
        expect(item).not.toHaveClass("line-through");
      }
    });
  });

  it("should close the list when button is blurred", async () => {
    render(<FloatingIcon enabled={true} />);

    await userEvent.click(screen.getByRole("button"));
    await userEvent.tab();

    expect(screen.queryByText("Últimas tarefas")).not.toBeInTheDocument();
  });

  it("should not render when numberOfTodos is 0", () => {
    mockNumberOfTodos = 0;
    render(<FloatingIcon enabled={true} />);

    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });
});
