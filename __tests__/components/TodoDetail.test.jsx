import { describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import TodoDetail from "../../src/components/TodoDetail";

global.fetch = vi.fn();

const createFetchResponse = (data, ok, status) => {
  return { json: () => new Promise((resolve) => resolve(data)), ok, status };
};

const todoResponse = {
  id: "123",
  userId: "7",
  title: "Some title",
};
const userResponse = {
  id: "7",
  name: "Some Name",
};

describe("TodoDetail success case", async () => {
  beforeEach(() => {
    global.fetch.mockReset();
    vi.mock("react-router-dom", () => ({
      useParams: () => ({ todoId: 123 }),
    }));
  });

  test("it displays the correct data of the todo", async () => {
    // Mock api response
    fetch
      .mockResolvedValueOnce(createFetchResponse(todoResponse, true, 200))
      .mockResolvedValueOnce(createFetchResponse(userResponse, true, 200));

    // Render TodoDetail and wait for api calls
    render(<TodoDetail />);

    // Check api calls
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/todos/123"
      );
      expect(fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/users/7"
      );
    });

    // Check todo's data
    expect(screen.getByText(/item number:/i)).toBeDefined();
    expect(screen.getByText(/123/i)).toBeDefined();
    expect(screen.getByText(/creator:/i)).toBeDefined();
    expect(screen.getByText(/Some Name/i)).toBeDefined();
    expect(screen.getByText(/title:/i)).toBeDefined();
    expect(screen.getByText(/Some title/i)).toBeDefined();
    expect(screen.queryByText(/errors:/i)).toBeNull();
    expect(screen.queryByText(/Http response error: 500/i)).toBeNull();
  });
});

describe("TodoDetail failure case - /todos/:id API errors", async () => {
  beforeEach(() => {
    global.fetch.mockReset();
    vi.mock("react-router-dom", () => ({
      useParams: () => ({ todoId: 123 }),
    }));
  });

  test("it displays an error message when the API fails (500)", async () => {
    // Mock api response
    fetch
      .mockResolvedValueOnce(createFetchResponse({}, false, 500))
      .mockResolvedValueOnce(createFetchResponse(userResponse, true, 200));

    // Render TodoDetail and wait for api calls
    render(<TodoDetail />);

    // Check api calls
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/todos/123"
      );
      expect(fetch).not.toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/users/7"
      );
    });

    // Check todo's data
    expect(screen.getByText(/item number:/i)).toBeDefined();
    expect(screen.queryByText(/123/i)).toBeNull();
    expect(screen.getByText(/creator:/i)).toBeDefined();
    expect(screen.queryByText(/Some Name/i)).toBeNull();
    expect(screen.getByText(/title:/i)).toBeDefined();
    expect(screen.queryByText(/Some title/i)).toBeNull();
    expect(screen.getByText(/errors:/i)).toBeDefined();
    expect(screen.getByText(/Http response error: 500/i)).toBeDefined();
  });

  test("it displays an error message when the /todos/:id API fails (json error)", async () => {
    // Mock api response
    fetch
      .mockResolvedValueOnce({
        json: () => new Promise((_, reject) => reject()),
        ok: true,
        status: 200,
      })
      .mockResolvedValueOnce(createFetchResponse(userResponse, true, 200));

    // Render TodoDetail and wait for api calls
    render(<TodoDetail />);

    // Check api calls
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/todos/123"
      );
      expect(fetch).not.toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/users/7"
      );
    });

    // Check todo's data
    expect(screen.getByText(/item number:/i)).toBeDefined();
    expect(screen.queryByText(/123/i)).toBeNull();
    expect(screen.getByText(/creator:/i)).toBeDefined();
    expect(screen.queryByText(/Some Name/i)).toBeNull();
    expect(screen.getByText(/title:/i)).toBeDefined();
    expect(screen.queryByText(/Some title/i)).toBeNull();
    expect(screen.getByText(/errors:/i)).toBeDefined();
    expect(screen.getByText(/Json parse error:/i)).toBeDefined();
  });
});

describe("TodoDetail failure case - /users/:id API errors", async () => {
  beforeEach(() => {
    global.fetch.mockReset();
    vi.mock("react-router-dom", () => ({
      useParams: () => ({ todoId: 123 }),
    }));
  });

  test("it displays an error message when the API fails (500)", async () => {
    // Mock api response
    fetch
      .mockResolvedValueOnce(createFetchResponse(todoResponse, true, 200))
      .mockResolvedValueOnce(createFetchResponse({}, false, 500));

    // Render TodoDetail and wait for api calls
    render(<TodoDetail />);

    // Check api calls
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/todos/123"
      );
      expect(fetch).not.toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/users/7"
      );
    });

    // Check todo's data
    expect(screen.getByText(/item number:/i)).toBeDefined();
    expect(screen.getByText(/123/i)).toBeDefined();
    expect(screen.getByText(/creator:/i)).toBeDefined();
    expect(screen.queryByText(/Some Name/i)).toBeNull();
    expect(screen.getByText(/title:/i)).toBeDefined();
    expect(screen.getByText(/Some title/i)).toBeDefined();
    expect(screen.getByText(/errors:/i)).toBeDefined();
    expect(screen.getByText(/Http response error: 500/i)).toBeDefined();
  });

  test("it displays an error message when the /todos/:id API fails (json error)", async () => {
    // Mock api response
    fetch
      .mockResolvedValueOnce(createFetchResponse(todoResponse, true, 200))
      .mockResolvedValueOnce({
        json: () => new Promise((_, reject) => reject()),
        ok: true,
        status: 200,
      });

    // Render TodoDetail and wait for api calls
    render(<TodoDetail />);

    // Check api calls
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/todos/123"
      );
      expect(fetch).not.toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/users/7"
      );
    });

    // Check todo's data
    expect(screen.getByText(/item number:/i)).toBeDefined();
    expect(screen.getByText(/123/i)).toBeDefined();
    expect(screen.getByText(/creator:/i)).toBeDefined();
    expect(screen.queryByText(/Some Name/i)).toBeNull();
    expect(screen.getByText(/title:/i)).toBeDefined();
    expect(screen.getByText(/Some title/i)).toBeDefined();
    expect(screen.getByText(/errors:/i)).toBeDefined();
    expect(screen.getByText(/Json parse error:/i)).toBeDefined();
  });
});
