"use client"
import React from 'react';
import TaskItems from '@/components/TaskItems';
import { useTaskState } from '@/context/taskContext';
import styled from 'styled-components';
import { useGlobalState } from '@/context/globalProvider';


const Important = () => {
  const { tasks } = useTaskState();
  const importantTasks = tasks.filter(task => task.isImportant);
  const { theme } = useGlobalState();

  return (
   <ImportantStyled theme={theme}>
     <div className='tasks grid'>
      {importantTasks.length > 0 ? (
        importantTasks.map((task) => (
          <TaskItems
            key={task._id}
            title={task.title}
            description={task.description}
            dueDate={task.dueDate}
            isCompleted={task.isCompleted}
            isImportant={task.isImportant}
            id={task._id}
            toggleTaskCompletion={() => {}}
            deleteTask={() => {}}
            handleEditClick={() => {}}
          />
        ))
      ) : (
        <p>No Important Tasks available</p>
      )}
    </div>
   </ImportantStyled>
  );
};

const ImportantStyled = styled.div`
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

`
export default Important;