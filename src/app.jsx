import React from "react";
import TodoList from "./components/TodoList";

// Home function that is reflected across the site
export default function App() {
  return (
    <main role="main" className="wrapper">
      <TodoList />
    </main>
  );
}
