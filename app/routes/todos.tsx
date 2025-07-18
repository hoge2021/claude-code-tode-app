import { todos } from "~/database/schema";
import { eq } from "drizzle-orm";
import type { Route } from "./+types/todos";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo App" },
    { name: "description", content: "Manage your todos" },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  const todos = await context.db.query.todos.findMany({
    orderBy: (todos, { desc }) => [desc(todos.createdAt)],
  });
  
  return { todos };
}

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  
  if (intent === "create") {
    const title = formData.get("title");
    if (typeof title !== "string" || !title.trim()) {
      return { error: "Title is required" };
    }
    
    const id = crypto.randomUUID();
    await context.db.insert(todos).values({
      id,
      title: title.trim(),
    });
  } else if (intent === "toggle") {
    const id = formData.get("id");
    const completed = formData.get("completed") === "true";
    
    if (typeof id !== "string") {
      return { error: "Invalid todo ID" };
    }
    
    await context.db
      .update(todos)
      .set({ completed: !completed })
      .where(eq(todos.id, id));
  } else if (intent === "delete") {
    const id = formData.get("id");
    
    if (typeof id !== "string") {
      return { error: "Invalid todo ID" };
    }
    
    await context.db.delete(todos).where(eq(todos.id, id));
  }
  
  return null;
}

export default function Todos({ actionData, loaderData }: Route.ComponentProps) {
  const [newTodo, setNewTodo] = useState("");
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Todo List</h1>
      
      {actionData?.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {actionData.error}
        </div>
      )}
      
      <form method="post" className="mb-6">
        <input type="hidden" name="intent" value="create" />
        <div className="flex gap-2">
          <input
            type="text"
            name="title"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
      </form>
      
      <ul className="space-y-2">
        {loaderData.todos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <form method="post" className="flex items-center gap-3 flex-1">
              <input type="hidden" name="intent" value="toggle" />
              <input type="hidden" name="id" value={todo.id} />
              <input type="hidden" name="completed" value={String(todo.completed || false)} />
              <button
                type="submit"
                className="w-5 h-5 border-2 rounded flex items-center justify-center hover:bg-gray-100"
              >
                {todo.completed && (
                  <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              <span className={`flex-1 ${todo.completed ? "line-through text-gray-500" : ""}`}>
                {todo.title}
              </span>
            </form>
            <form method="post">
              <input type="hidden" name="intent" value="delete" />
              <input type="hidden" name="id" value={todo.id} />
              <button
                type="submit"
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>
      
      {loaderData.todos.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No todos yet. Add one above!</p>
      )}
    </div>
  );
}