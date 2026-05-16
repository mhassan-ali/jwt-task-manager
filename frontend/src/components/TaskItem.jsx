function TaskItem({
  t,
  editId,
  editText,
  setEditText,
  setUpdatingId,
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
    <div
      className={`flex justify-between items-center border rounded-lg p-3 shadow-sm hover:shadow-md transition ${
        t.completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
      }`}
    >
      
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={t.completed}
          onChange={() => handleToggle(t.id)}
          disabled={togglingId === t.id}
          className="w-4 h-4 accent-green-600 cursor-pointer disabled:cursor-not-allowed"
        />

        {editId === t.id ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            disabled={updatingId === t.id}
            maxLength="200"
            className="flex-1 border rounded p-1 mr-2 disabled:bg-gray-100"
          />
        ) : (
          <div className="flex-1">

  <p
    className={`font-semibold ${
      t.completed ? "line-through text-gray-400" : "text-gray-800"
    }`}
  >
    {t.title}
  </p>

  
  {t.description && (
    <p className="text-sm text-gray-500 mt-1">
      {t.description}
    </p>
  )}

  
  <div className="flex items-center gap-2 mt-2">
    
    <span
      className={`text-xs px-2 py-1 rounded-full font-medium ${
        t.priority === "high"
          ? "bg-red-100 text-red-600"
          : t.priority === "medium"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-green-100 text-green-600"
      }`}
    >
      {t.priority}
    </span>

   
    <span className="text-xs text-gray-400">
      {new Date(t.created_at).toLocaleDateString()}
    </span>
  </div>
</div>
        )}
      </div>

     
      <div className="flex gap-3">
        {editId === t.id ? (
          <>
            <button
              onClick={() => handleUpdate(t.id)}
              disabled={updatingId === t.id}
              className="text-green-600 hover:text-green-800 text-sm font-medium disabled:text-gray-400"
            >
              {updatingId === t.id ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                setEditId(null);
                setEditText("");
              }}
              className="text-gray-500 hover:text-gray-700 text-sm font-medium"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setEditId(t.id);
              setEditText(t.title);
              setError(null);
            }}
            disabled={addingTask || deletingId === t.id || t.completed}
            className="text-blue-500 hover:text-blue-700 text-sm font-medium disabled:text-gray-400"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => handleDelete(t.id)}
          disabled={deletingId === t.id || addingTask}
          className="text-red-500 hover:text-red-700 text-sm font-medium disabled:text-gray-400"
        >
          {deletingId === t.id ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default TaskItem;