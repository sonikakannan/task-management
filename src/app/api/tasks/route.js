import db from "@/lib/db";
import Task from "@/models/Task";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, dueDate, isCompleted, isImportant } = await req.json();
    
    if (!title || !description || !dueDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (title.length < 2) {
      return NextResponse.json({ error: "Title must be at least 2 characters long" }, { status: 400 });
    }

    await db.connect();
    
    const newTask = new Task({
      title,
      description,
      dueDate,
      isCompleted: isCompleted ?? false,
      isImportant: isImportant ?? false,
      userId,
    });

    await newTask.save();
    await db.disconnect();

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Error creating task" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db.connect();
    const tasks = await Task.find({ userId });
    await db.disconnect();

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Error fetching tasks" }, { status: 500 });
  }
}

