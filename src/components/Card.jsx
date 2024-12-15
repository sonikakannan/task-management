import { motion } from "framer-motion";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";
import { MenuButtons } from "./MenuButtons";
import { ColumnButtons } from "./ColumnButtons";
import { DropIndicator } from "./DropIndicator";

// Helper function to calculate the time ago
const getTimeAgo = (startDate) => {
  const diffInSeconds = Math.floor((new Date() - new Date(startDate)) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
  if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
  if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }
  return "Just now";
};



export const Card = ({ card, hanldeDragStart, setCards }) => {
  const { id, title, description, startDate, dueDate, priority, column } = card;
  const [menuOpen, setMenuOpen] = useState(false);
  const [toMoveOpen, setToMoveOpen] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(""); // State to store time elapsed
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setMenuOpen(false);
        setToMoveOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (startDate) {
      setElapsedTime(getTimeAgo(startDate)); // Calculate and set the time when the component mounts
    }
  }, [startDate]);

  const handleDelete = () => {
    const confirm = window.confirm("Are you sure you want to delete this?");
    if (!confirm) return;
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const handleMenuOpen = () => {
    setToMoveOpen(false);
    setMenuOpen((prev) => !prev);
  };

  const handleMoveOpen = () => {
    setMenuOpen(false);
    setToMoveOpen(true);
  };

  const handleMove = (newColumn) => {
    const updatedCard = { ...card, column: newColumn };
    setCards((prev) => prev.filter((c) => c.id !== id));
    setCards((prev) => [...prev, updatedCard]);
  };

  // Priority color classes based on priority value
  const priorityClass = {
    low: "text-red-500",
    medium: "text-yellow-500",
    high: "text-green-500",
  }[priority] || "text-neutral-500"; // Default to neutral if no priority

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable
        ref={cardRef}
        onDragStart={(event) => hanldeDragStart(event, card)}
        className="cursor-grab rounded border shadow-md bg-white text-black p-5 lg:p-3 active:cursor-grabbing relative"
      >
        <div className="lg:max-w-40">
          <h1 className="text-xl font-semibold break-words">{title}</h1>
          <p className="text-base text-neutral-600 mt-1 lg:break-words">{description}</p> {/* Ensures description wraps */}
          <div className="text-base text-neutral-700 mt-2 space-y-1">
            <div className="flex justify-between lg:block">
              <p><span className="font-semibold ">Start Date:</span> {startDate || "N/A"}</p>
              <p><span className="font-semibold">Due Date:</span> {dueDate || "N/A"}</p>
            </div>
          </div>
          <div className="flex justify-between mt-1">
            <p>{elapsedTime}</p>
            <p><span className="font-semibold">Priority:</span> <span className={priorityClass}>{priority || "N/A"}</span></p>
          </div>
        </div>
        <BiDotsVerticalRounded
          onClick={handleMenuOpen}
          className="absolute right-1 top-2 text-lg text-neutral-900 cursor-pointer"
        />
        {menuOpen && <MenuButtons handleMoveOpen={handleMoveOpen} handleDelete={handleDelete} />}
        {toMoveOpen && <ColumnButtons column={column} handleMove={handleMove} />}
      </motion.div>
    </>
  );
};

