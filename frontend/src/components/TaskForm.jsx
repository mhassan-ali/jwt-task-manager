function TaskForm({
  task,
  setTask,
  description,
  setDescription,
  priority,
  setPriority,
  handleSubmit,
  addingTask,
  loading
}) {
  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-3">
      
     
      <input
        type="text"
        placeholder="Enter task title..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        disabled={addingTask || loading}
        maxLength="200"
        className="w-full h-10 border border-gray-300 rounded-lg px-3 focus:ring-2 focus:ring-blue-500"
      />

      
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={addingTask || loading}
        maxLength="500"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
      />

    
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        type="submit"
        disabled={addingTask || loading || !task.trim()}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {addingTask ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;