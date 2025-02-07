"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const TaskContext = createContext();
const TaskUpdateContext = createContext();

export const TaskProvider = ({ children }) => {
  const defaultTask = {
    title: "",
    description: "",
    dueDate: "",
    status: "incomplete",
    important: false,
  };

  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState(defaultTask);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };
    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEditClick = (id) => {
    const taskToEdit = tasks.find((task) => task._id === id);
    setTask({
      title: taskToEdit.title,
      description: taskToEdit.description,
      dueDate: taskToEdit.dueDate,
      status: taskToEdit.isCompleted ? "complete" : "incomplete",
      important: taskToEdit.isImportant,
    });
    setEditTaskId(id);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      try {
        const response = await axios.patch(`/api/tasks/${editTaskId}`, {
          ...task,
          isCompleted: task.status === "complete",
          isImportant: task.important,
        });

        setTasks(tasks.map((t) => (t._id === editTaskId ? response.data : t)));
        toast.success("Task updated successfully.");
      } catch (error) {
        toast.error("Error updating task.");
        console.error("Error updating task:", error.response?.data?.error || error.message);
      }
      setIsEditing(false);
      setEditTaskId(null);
    } else {
      try {
        const response = await axios.post("/api/tasks", {
          ...task,
          isCompleted: task.status === "complete",
          isImportant: task.important,
        });
        setTasks([...tasks, response.data]);
        toast.success("Task created successfully.");
      } catch (error) {
        toast.error("Error saving task.");
        console.error("Error saving task:", error.response?.data?.error || error.message);
      }
    }

    setOpenDialog(false);
    setTask(defaultTask);
  };

  const toggleTaskCompletion = async (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );

    try {
      await axios.patch(`/api/tasks/${taskId}`, {
        isCompleted: !tasks.find((task) => task._id === taskId).isCompleted,
      });
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
      toast.success("Task deleted successfully.");
    } catch (error) {
      toast.error("Error deleting task.");
      console.error("Error deleting task:", error.response?.data?.error || error.message);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, task, openDialog, isEditing, editTaskId }}>
      <TaskUpdateContext.Provider
        value={{
          handleInputChange,
          handleEditClick,
          handleSubmit,
          toggleTaskCompletion,
          deleteTask,
          setOpenDialog,
        }}
      >
        {children}
      </TaskUpdateContext.Provider>
    </TaskContext.Provider>
  );
};

export const useTaskState = () => useContext(TaskContext);
export const useTaskUpdate = () => useContext(TaskUpdateContext);