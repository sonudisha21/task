"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface Todo {
  id: number;
  task: string;
  status: "Pending" | "Progress" | "Completed";
}

interface TodoPost {
  name: string;
}

async function postTask(body: TodoPost) {
  const response = await fetch("http://localhost:3000/api/todo", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return await response.json();
}

async function getTasks() {
  const response = await fetch("http://localhost:3000/api/todo");
  return await response.json();
}

export default function DashboardPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    async function loadTasks() {
      const data = await getTasks();
      setTodos(data);
    }

    loadTasks();
  }, []);

  const addTodo = async (status: "Pending" | "Progress" | "Completed") => {
    if (inputValue.trim() === "") return;
    const newTodo: Todo = {
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
      task: inputValue.trim(),
      status: status,
    };
    await postTask({ name: newTodo.task });
    setTodos([...todos, newTodo]);
    setInputValue(""); //comment
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateTodo = (id: number, newTask: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task: newTask } : todo
    );
    setTodos(updatedTodos);
  };

  const moveTodo = (
    id: number,
    newStatus: "Pending" | "Progress" | "Completed"
  ) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="border rounded p-4 bg-yellow-100">
          <h2 className="text-xl font-bold mb-2">Pending</h2>
          <input
            type="text"
            className="border rounded px-2 py-1 mb-2"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={() => addTodo("Pending")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mb-4"
          >
            Add Task
          </button>
          <ul>
            {todos
              .filter((todo) => todo.status === "Pending")
              .map((todo) => (
                <li key={todo.id} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={todo.task}
                    onChange={(e) => updateTodo(todo.id, e.target.value)}
                    className="border rounded px-2 py-1 mr-2"
                  />
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => moveTodo(todo.id, "Progress")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded ml-2"
                  >
                    Start
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <div className="border rounded p-4 bg-blue-100">
          <h2 className="text-xl font-bold mb-2">In Progress</h2>
          <ul>
            {todos
              .filter((todo) => todo.status === "Progress")
              .map((todo) => (
                <li key={todo.id} className="flex items-center mb-2">
                  {todo.task}
                  <button
                    onClick={() => moveTodo(todo.id, "Completed")}
                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded ml-2"
                  >
                    Complete
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <div className="border rounded p-4 bg-green-100">
          <h2 className="text-xl font-bold mb-2">Completed</h2>
          <ul>
            {todos
              .filter((todo) => todo.status === "Completed")
              .map((todo) => (
                <li key={todo.id} className="flex items-center mb-2">
                  {todo.task}
                  <button
                    onClick={() =>
                      updateTodo(
                        todo.id,
                        prompt("Enter new task:", todo.task) || ""
                      )
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded ml-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded ml-2"
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
