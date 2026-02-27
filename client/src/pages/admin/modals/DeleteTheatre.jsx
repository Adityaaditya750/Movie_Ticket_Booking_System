import React from "react";

const DeleteTheatre = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="w-full max-w-sm bg-[#0f172a] p-6 rounded-2xl border border-gray-700 text-center">

        <h2 className="text-xl font-bold text-red-500 mb-3">
          Delete Theatre
        </h2>

        <p className="text-gray-400 mb-6">
          Are you sure you want to delete this theatre?  
          This action cannot be undone.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-gray-700 hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded bg-red-600 hover:bg-red-700 font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTheatre;