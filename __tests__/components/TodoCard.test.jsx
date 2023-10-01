import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import TodoCard from "../../src/components/TodoCard";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

describe("TodoCard success case", async () => {
  test("it displays the todo data correctly", async () => {
    const props = {
      title: "Some title",
      id: 1,
      completed: true,
    };
    // Creater router context so that TodoCard can be rendered
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <TodoCard {...props} />,
        },
      ],
      {
        initialEntries: ["/"],
      }
    );

    render(<RouterProvider router={router} />);

    // Check todo's data is present
    const link = screen.getByRole("link", { name: /#1 Some title/i });
    expect(link).toBeDefined();
    expect(link.href).toContain("/todos/1");
  });
});
