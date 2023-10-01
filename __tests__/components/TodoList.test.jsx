import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TodoList from "../../src/components/TodoList";

global.fetch = vi.fn();

const createFetchResponse = (data, ok, status) => {
  return { json: () => new Promise((resolve) => resolve(data)), ok, status };
};

const todoListResponse = [
  {
    id: "1",
    title: "Some title",
    completed: false,
  },
  {
    id: "2",
    title: "Other title",
    completed: true,
  },
];

describe("TodoList success case", async () => {
  beforeEach(() => {
    // Mock TodoCard object
    vi.mock("../../src/components/TodoCard", () => ({
      default: (props) => {
        vi.fn()(props);
        return <div>{props.title}</div>;
      },
    }));
  });

  test("it displays a list of TodoCard elements", async () => {
    // Mock api response
    fetch.mockResolvedValueOnce(
      createFetchResponse(todoListResponse, true, 200)
    );

    // Render TodoList and wait for api call
    render(<TodoList />);

    // Check api call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/todos"
      );
    });

    // Check the mocked TodoCard elements are displayed
    expect(screen.getByText(/Some Title/i)).toBeDefined();
    expect(screen.getByText(/Other Title/i)).toBeDefined();
    // Check filter input is displayed
    expect(screen.queryByTestId(/filter/i)).toBeDefined();
  });

  test("it filters TodoCard elements properly", async () => {
    // Mock api response
    fetch.mockResolvedValueOnce(
      createFetchResponse(todoListResponse, true, 200)
    );

    // Render TodoList and wait for api call
    render(<TodoList />);

    // Check api call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/todos"
      );
    });

    // Check the mocked TodoCard elements are displayed
    expect(screen.getByText(/Some Title/i)).toBeDefined();
    expect(screen.getByText(/Other Title/i)).toBeDefined();
    // Check filter input is displayed
    const filterInput = screen.getByTestId(/filter/i);
    expect(filterInput).toBeDefined();

    // Type in filter and check only one TodoCard is present
    fireEvent.change(filterInput, { target: { value: "Some" } });
    expect(screen.getByText(/Some Title/i)).toBeDefined();
    expect(screen.queryByText(/Other Title/i)).toBeNull();
  });
});

describe("Todo list failure case - /todos API errors", async () => {
  beforeEach(() => {
    // Mock TodoCard object
    vi.mock("../../src/components/TodoCard", () => ({
      default: (props) => {
        vi.fn()(props);
        return <div>{props.title}</div>;
      },
    }));
  });

  test("it displays an error message when the API fails (500)", async () => {
    // Mock api response
    fetch.mockResolvedValueOnce(
      createFetchResponse(todoListResponse, false, 500)
    );

    // Render TodoList and wait for api call
    render(<TodoList />);

    // Check api call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/todos"
      );
    });

    // Check the mocked TodoCard elements are NOT displayed
    expect(screen.queryByText(/Some Title/i)).toBeNull();
    expect(screen.queryByText(/Other Title/i)).toBeNull();
    // Check filter input is displayed
    const filterInput = screen.queryByTestId(/filter/i);
    expect(filterInput).toBeDefined();
    // Check error message is displayed
    expect(screen.getByText(/errors:/i)).toBeDefined();
    expect(screen.getByText(/Http response error: 500/i)).toBeDefined();
  });

  test("it displays an error message when the API fails (json error)", async () => {
    // Mock api response
    fetch.mockResolvedValueOnce({
      json: () => new Promise((_, reject) => reject()),
      ok: true,
      status: 200,
    });

    // Render TodoList and wait for api call
    render(<TodoList />);

    // Check api call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/todos"
      );
    });

    // Check the mocked TodoCard elements are NOT displayed
    expect(screen.queryByText(/Some Title/i)).toBeNull();
    expect(screen.queryByText(/Other Title/i)).toBeNull();
    // Check filter input is displayed
    const filterInput = screen.queryByTestId(/filter/i);
    expect(filterInput).toBeDefined();
    // Check error message is displayed
    expect(screen.getByText(/errors:/i)).toBeDefined();
    expect(screen.getByText(/Json parse error/i)).toBeDefined();
  });
});
