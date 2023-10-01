import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledTodoCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  width: 250px;
  border: 1px solid black;
  background-color: ${(props) => (props.$completed ? "green" : "crimson")};
  text-decoration: none;
  color: black;

  .title {
    max-width: 20ch;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const TodoCard = ({ id, title, completed }) => {
  return (
    <StyledTodoCard $completed={completed} to={`todos/${id}`}>
      <div>#{id}</div>
      <span title={title} className="title">
        {title}
      </span>
    </StyledTodoCard>
  );
};

export default TodoCard;
