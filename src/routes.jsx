import App from "./app";
import ErrorPage from "./error-page";
import TodoDetail from "./components/TodoDetail";

export const routesConfig = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "todos/:todoId",
    element: <TodoDetail />,
  },
];
