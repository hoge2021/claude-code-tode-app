import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo App" },
    { name: "description", content: "Welcome to the Todo App!" },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  return {
    message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Todo App</h1>
      
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
        <p className="text-gray-600 mb-6">
          This is a simple todo application built with React Router v7, Cloudflare Workers, and D1 database.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <span className="text-blue-500 mr-3">✓</span>
            <div>
              <h3 className="font-semibold">Create Todos</h3>
              <p className="text-gray-600">Add new tasks to your todo list</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <span className="text-blue-500 mr-3">✓</span>
            <div>
              <h3 className="font-semibold">Mark Complete</h3>
              <p className="text-gray-600">Check off tasks as you complete them</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <span className="text-blue-500 mr-3">✓</span>
            <div>
              <h3 className="font-semibold">Delete Todos</h3>
              <p className="text-gray-600">Remove tasks you no longer need</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <a
            href="/todos"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to Todos →
          </a>
        </div>
      </div>
      
      {loaderData.message && (
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">Message from Cloudflare: {loaderData.message}</p>
        </div>
      )}
    </div>
  );
}