import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

export const AddCard = ({ column, setCards }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // New state for description
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Check if all required fields are filled
  const isFormValid =
    title.trim() &&
    description.trim() &&
    priority &&
    dueDate &&
    startDate;

  const handleAddCard = () => {
    if (!isFormValid) return;

    const newCard = {
      id: Math.random().toString(),
      title: title.trim(),
      description: description.trim(), // Add description here
      column,
      priority,
      dueDate,
      startDate,
    };

    setCards((prev) => [...prev, newCard]); // Add the card to the state
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription(""); // Reset description
    setPriority("low");
    setDueDate("");
    setStartDate("");
    setIsDialogOpen(false);
  };

  return (
    <>
      <motion.button
        layout
        onClick={() => setIsDialogOpen(true)}
        className="flex w-full items-center gap-1.5 px-3 py-1.5 text-base hover:scale-105 text-neutral-700 transition-colors hover:text-neutral-500 outline-none"
      >
        <span>Add Card</span>
        <FiPlus />
      </motion.button>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-black">Add a New Card</AlertDialogTitle>
            <AlertDialogDescription>
              {/* <p className="text-sm text-neutral-500">Please fill in the details below:</p> */}
            </AlertDialogDescription>
            <div className="space-y-4">
              {/* Title Input */}
              <div>
                <label className="block text-gray-700">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter card title..."
                  className="border border-black text-black"
                  required
                />
              </div>

              {/* Priority Selection */}
              <div>
                <label className="block text-gray-700">Priority</label>
                <select
                  required
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full rounded border text-black border-black p-2 text-sm"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Dates */}
              <div>
                <label className="block text-gray-700">Start Date</label>
                <input
                  required
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full text-black rounded border border-black p-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700">Due Date</label>
                <input
                  required
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full rounded border text-black border-black p-2 text-sm"
                />
              </div>
                            {/* Description Input */}
                            <div>
                <label className="block text-gray-700">Description</label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter card description..."
                  className="border border-black text-black w-full h-20 rounded-lg"
                />
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={resetForm}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleAddCard}
              disabled={!isFormValid} // Disable the button if form is not valid
              className=" hover:text-black bg-black text-white"
            >
              Add
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
