"use client";

import { useGlobalState } from "@/context/globalProvider";
import React from "react";
import styled from "styled-components";
import { FaBookmark, FaTrash } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";

const TaskItems = ({ title, description, dueDate, isCompleted, isImportant, id, toggleTaskCompletion, deleteTask, handleEditClick }) => {
  const { theme } = useGlobalState();

  return (
    <TaskItemStyled theme={theme}>
      {isImportant && <FaBookmark className="bookmark-icon" />}
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{dueDate}</p>
      <div className="action-container">
      <MdEditDocument className="edit-icon" onClick={() => handleEditClick(id)} />
      <FaTrash className="delete-icon" onClick={() => deleteTask(id)} />
        <button className={`status-btn ${isCompleted ? "completed" : "incomplete"}`} onClick={() => toggleTaskCompletion(id)}>
          {isCompleted ? "Completed" : "Incomplete"}
        </button>
        
      </div>
    </TaskItemStyled>
  );
};

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};
  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .date {
    margin-top: auto;
  }

  .bookmark-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5rem;
    color: gold;
  }

  .action-container {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .status-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 9999px;
    cursor: pointer;
    color: white;
    font-weight: bold;
  }

  .completed {
    background: #4caf50;
  }

  .incomplete {
    background: #f44336;
  }

  .delete-icon,
  .edit-icon {
    font-size: 1.5rem;
    cursor: pointer;
    transition: 0.3s;
  }

  .delete-icon {
    color: red;
    &:hover {
      color: darkred;
    }
  }

  .edit-icon {
    width:25px;
    height: 25px;
  }
`;

export default TaskItems;
