import React, { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const AdminTheatre = () => {
  const [theatres, setTheatres] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleDeleteTheatre = (index) => {
    setTheatres(theatres.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen p-6 text-white">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">🏛 Theatre Management</h1>

        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-red-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          + Create Theatre
        </button>
      </div>

      {/* Table / Empty State */}
      {theatres.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border border-dashed border-gray-600 rounded-xl">
          <p className="text-xl font-semibold text-gray-400">
            No Theatres Found 🏛
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Click “Create Theatre” to add your first theatre
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-700">
          <table className="w-full text-sm">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="p-4 text-left">Theatre Name</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Screens</th>
                <th className="p-4 text-left">Contact</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-[#020617]">
              {theatres.map((theatre, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-700 hover:bg-gray-800 transition"
                >
                  <td className="p-4 font-medium">{theatre.name}</td>
                  <td className="p-4">{theatre.location}</td>
                  <td className="p-4">{theatre.screens}</td>
                  <td className="p-4">{theatre.contact}</td>

                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button className="p-2 rounded-full bg-cyan-600/20 hover:bg-cyan-600">
                        <FiEdit2 />
                      </button>

                      <button
                        onClick={() => handleDeleteTheatre(index)}
                        className="p-2 rounded-full bg-red-600/20 hover:bg-red-600"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Theatre Modal – add later */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-xl">
            <p className="text-gray-300">Create Theatre Modal Here</p>
            <button
              onClick={() => setShowCreateModal(false)}
              className="mt-4 bg-red-600 px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTheatre;
