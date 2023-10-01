import React, { useEffect, useState } from "react";
import TodoCard from "../TodoCard";
import styled from "styled-components";
import getResource from "../../utils/api";
import { skeletonAnimation, skeletonElement } from "../../utils/common-styles";

const StyledTodoList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const SkeletonStyledTodoList = styled(StyledTodoList)`
  ${skeletonAnimation}
  .todo-card-skeleton {
    width: 250px;
    height: 100px;
    ${skeletonElement}
  }
`;

const TodoList = () => {
  const [filter, setFilter] = useState();
  const [todoList, setTodoList] = useState({});
  const [errors, setErrors] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const todoListResponse = await getResource(`/todos`);
      setTodoList(todoListResponse?.response);
      setErrors(todoListResponse?.errors);
      setLoading(false);
    })();
  }, []);

  const TodoListComponent = () => {
    if (isLoading) {
      return (
        <SkeletonStyledTodoList>
          {Array(25).fill(<div className="todo-card-skeleton"></div>)}
        </SkeletonStyledTodoList>
      );
    } else {
      return (
        <StyledTodoList>
          {todoList &&
            todoList
              .filter((todo) => !filter || todo.title.includes(filter))
              .map((todo) => (
                <TodoCard
                  title={todo.title}
                  id={todo.id}
                  key={todo.id}
                  completed={todo.completed}
                ></TodoCard>
              ))}
        </StyledTodoList>
      );
    }
  };

  return (
    <>
      <>
        Search by title includes:{" "}
        <input
          type="text"
          value={filter}
          placeholder="Filter..."
          onChange={(event) => setFilter(event.target.value)}
        ></input>
      </>
      {errors.length > 0 && <div>errors: {errors}</div>}
      {TodoListComponent(todoList)}
    </>
  );
};

export default TodoList;
