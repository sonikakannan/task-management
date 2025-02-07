"use client";
import React from 'react';
import TaskItems from '@/components/TaskItems';
import { useTaskState, useTaskUpdate } from '@/context/taskContext';
import styled from 'styled-components';
import { useGlobalState } from '@/context/globalProvider';

const InCompleted = () => {
  const { tasks } = useTaskState();
  const { toggleTaskCompletion, deleteTask, handleEditClick } = useTaskUpdate();
  const incompleteTasks = tasks.filter(task => !task.isCompleted);
  const { theme } = useGlobalState();

  return (
    <InCompletedStyled theme={theme}>
      <div className='tasks grid'>
        {incompleteTasks.length > 0 ? (
          incompleteTasks.map((task) => (
            <TaskItems
              key={task._id}
              title={task.title}
              description={task.description}
              dueDate={task.dueDate}
              isCompleted={task.isCompleted}
              isImportant={task.isImportant}
              id={task._id}
              toggleTaskCompletion={toggleTaskCompletion}
              deleteTask={deleteTask}
              handleEditClick={handleEditClick}
            />
          ))
        ) : (
          <p>No Incomplete Tasks available</p>
        )}
      </div>
    </InCompletedStyled>
  );
};

const InCompletedStyled = styled.div`
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .tasks {
    margin: 2rem 0;
  }
`;

export default InCompleted;