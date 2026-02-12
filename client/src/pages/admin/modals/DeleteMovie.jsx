import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

const DeleteModal = ({ title, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-xl p-6 w-full max-w-sm text-center animate-scaleIn">
        <FiAlertTriangle className="text-red-500 text-4xl mx-auto mb-3" />

        <h2 className="text-lg font-semibold mb-2">
          Delete Movie?
        </h2>

        <p className="text-gray-400 text-sm mb-6">
          Are you sure you want to delete{" "}
          <span className="text-white font-medium">
            {title}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="w-full bg-zinc-700 hover:bg-zinc-600 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
