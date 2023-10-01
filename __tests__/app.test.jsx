import { describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { routesConfig } from "../src/routes";

describe("App render test with react-router", () => {
  beforeEach(() => {
    // Mock TodoList object
    vi.mock("../src/components/TodoList", () => ({
      default: (props) => {
        vi.fn()(props);
        return <div>TodoList Mock</div>;
      },
    }));
  });

  test("it renders the main app component correctly", async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByRole("main")).toBeDefined();
    });
  });
});
