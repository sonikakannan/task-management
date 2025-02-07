"use client";

import { plus } from "@/utils/icons";
import { X } from "lucide-react";
import React from "react";
import styled from "styled-components";

const Model = ({ openDialog, setOpenDialog, task, handleInputChange, handleSubmit }) => {
  if (!openDialog) return null;

  return (
    <ModelStyled>
      <div className="overlay" onClick={() => setOpenDialog(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={() => setOpenDialog(false)}>
            <X />
          </button>

          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={task?.title ?? ""}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={task?.description ?? ""}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={task?.dueDate ?? ""}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Complete/Incomplete Select Input */}
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={task?.status ?? "incomplete"}
                onChange={handleInputChange}
                required
              >
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
              </select>
            </div>

            {/* Important Checkbox */}
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="important"
                  checked={task?.important ?? false}
                  onChange={handleInputChange}
                />
                Mark as Important
              </label>
            </div>

            <div className="button-group">
              <button type="submit" className='save-btn'>
                {plus} Save Task
              </button>
              <button type="button" className="cancel-btn" onClick={() => setOpenDialog(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModelStyled>
  );
};

const ModelStyled = styled.div`
  .overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 50;
  }

  .modal {
    background: #1f1f1f;
    padding: 1.5rem;
    border-radius: 8px;
    width: 100%;
    max-width: 500px;
    position: relative;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    color: gray;
    &:hover {
      color: black;
    }
  }

  .form {
    display: flex;
    flex-direction: column;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .form-group input,
  .form-group textarea,
  .form-group select {
    padding: 8px;
    background-color: #272727;
    border-radius: 4px;
    outline: none;
  }

  .checkbox-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .button-group {
    display: flex;
    gap: 1rem;
  }

  .save-btn {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: green;
  }

  .complete {
    background: #4caf50;
    color: white;
  }

  .incomplete {
    background: #f44336;
    color: white;
  }

  .cancel-btn {
    background: none;
    color: red;
    border: none;
    cursor: pointer;
  }
`;

export default Model;