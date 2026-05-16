import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  filteredTasks,
  filter,
  setFilter,
  loading,
  editId,
  editText,
  setEditText,
  updatingId,
  togglingId,
  deletingId,
  addingTask,
  handleToggle,
  handleUpdate,
  handleDelete,
  setEditId,
  setError,
}) {
  return (
    <>
     
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading tasks...</span>
        </div>
      ) : tasks.length === 0 ? (
        
        <p className="text-gray-500 text-sm text-center mt-4">
          No tasks yet. Add one above 👆
        </p>
      ) : (
        <>
          
          <div className="flex gap-2 mb-4 border-b border-gray-200 pb-4">
            {["all", "pending", "completed", "high", "medium", "low"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
  filter === f
    ? "bg-gray-800 text-white shadow-sm"
    : f === "high"
    ? "bg-red-100 text-red-600 hover:bg-red-200"
    : f === "medium"
    ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
    : f === "low"
    ? "bg-green-100 text-green-600 hover:bg-green-200"
    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
}`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

         
          {filteredTasks.length === 0 ? (
            <p className="text-gray-500 text-sm text-center mt-8 mb-8">
              No {filter} tasks found.
            </p>
          ) : (
            
            <div className="space-y-3">
              {filteredTasks.map((t) => (
                <TaskItem
                  key={t.id}
                  t={t}
                  editId={editId}
                  editText={editText}
                  setEditText={setEditText}
                  updatingId={updatingId}
                  togglingId={togglingId}
                  deletingId={deletingId}
                  addingTask={addingTask}
                  handleToggle={handleToggle}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                  setEditId={setEditId}
                  setError={setError}
                />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default TaskList;