import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import getResource from "../../utils/api";
import { skeletonAnimation, skeletonElement } from "../../utils/common-styles";

const StyledTodoDetail = styled.div`
  span {
    font-weight: bold;
  }
`;

const SkeletonStyledTodoDetail = styled(StyledTodoDetail)`
  ${skeletonAnimation}
  span {
    display: inline-block;
    height: 1em;
    min-width: 200px;
    ${skeletonElement}
  }
`;

const TodoDetail = () => {
  const { todoId } = useParams();
  const [todo, setTodo] = useState({});
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const todosResponse = await getResource(`/todos/${todoId}`);
      setTodo(todosResponse?.response);
      setErrors(todosResponse?.errors);
      if (todosResponse.errors.length <= 0) {
        const usersResponse = await getResource(
          `/users/${todosResponse?.response.userId}`
        );
        setUser(usersResponse?.response);
        setErrors(usersResponse?.errors);
      }
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return (
      <SkeletonStyledTodoDetail>
        {Array(3).fill(
          <div>
            <span></span>
          </div>
        )}
      </SkeletonStyledTodoDetail>
    );
  }

  return (
    <StyledTodoDetail>
      <div>
        <span>item number:</span> {todo?.id}
      </div>
      <div>
        <span>creator:</span> {user?.name}
      </div>
      <div>
        <span>title:</span> {todo?.title}
      </div>
      {errors.length > 0 && (
        <div>
          <span>errors:</span> {errors}
        </div>
      )}
    </StyledTodoDetail>
  );
};

export default TodoDetail;
