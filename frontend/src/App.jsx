import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import { taskAPI } from "./services/api.js";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./index.css";

function App() {

  
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [username, setUsername] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const [loading, setLoading] = useState(false);
  const [addingTask, setAddingTask] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

 
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

 
  const fetchUser = async () => {
    const result = await taskAPI.getCurrentUser();
    if (result.success) {
      setUsername(result.data.username);
    }
  };


  const fetchTasks = async () => {
    setLoading(true);
    setError(null);

    const result = await taskAPI.getTasks();

    if (result.success) {
      setTasks(result.data);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

 
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
      fetchUser();
    }
  }, [isAuthenticated]);


  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    if (filter === "high") return t.priority === "high";
    if (filter === "medium") return t.priority === "medium";
    if (filter === "low") return t.priority === "low";
    return true;
  });


  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.trim()) {
      setError("Task cannot be empty");
      return;
    }

    setAddingTask(true);

    const result = await taskAPI.createTask(
      task,
      description,
      priority
    );

    if (result.success) {
      setTask("");
      setDescription("");
      setPriority("medium");
      showSuccess("Task added successfully");
      await fetchTasks();
    } else {
      setError(result.error);
    }

    setAddingTask(false);
  };


  const handleDelete = async (id) => {
    const result = await taskAPI.deleteTask(id);
    if (result.success) {
      showSuccess("Task deleted successfully");
      await fetchTasks();
    }
  };


  const handleUpdate = async (id) => {
    const result = await taskAPI.updateTask(
      id,
      editText,
      description,
      priority
    );

    if (result.success) {
      setEditId(null);
      setEditText("");
      showSuccess("Task updated successfully");
      await fetchTasks();
    }
  };


  const handleToggle = async (id) => {
    await taskAPI.toggleTask(id);
    await fetchTasks();
  };

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 2000);
  };


  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <>
      <Navbar
        onLogout={handleLogout}
        username={username}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 flex justify-center items-start p-6">
        <div className="w-full max-w-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-xl rounded-2xl p-6 transition-colors duration-300">

          <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <TaskForm
            task={task}
            setTask={setTask}
            description={description}
            setDescription={setDescription}
            priority={priority}
            setPriority={setPriority}
            handleSubmit={handleSubmit}
            addingTask={addingTask}
            loading={loading}
          />

          {successMsg && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
              {successMsg}
            </div>
          )}

          <TaskList
            tasks={tasks}
            filteredTasks={filteredTasks}
            filter={filter}
            setFilter={setFilter}
            loading={loading}
            editId={editId}
            editText={editText}
            setEditText={setEditText}
            updatingId={updatingId}
            togglingId={togglingId}
            deletingId={deletingId}
            handleToggle={handleToggle}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            setEditId={setEditId}
            setError={setError}
          />
        </div>
      </div>
    </>
  );
}

export default App;