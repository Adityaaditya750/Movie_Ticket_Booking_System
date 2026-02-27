import React, { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import CreateTheatre from "../modals/CreateTheatre";
import UpdateTheatre from "../modals/UpdateTheatre";
import DeleteConfirmModal from "../modals/DeleteTheatre";

const AdminTheatre = () => {
  const [theatres, setTheatres] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  /* CREATE */
  const handleCreateTheatre = (theatre) => {
    setTheatres((prev) => [...prev, theatre]);
    setShowCreateModal(false);
  };

  /* UPDATE */
  const handleUpdateTheatre = (updatedTheatre) => {
    setTheatres((prev) =>
      prev.map((t, i) =>
        i === selectedIndex ? updatedTheatre : t
      )
    );
    setShowUpdateModal(false);
  };

  /* DELETE */
  const confirmDeleteTheatre = () => {
    setTheatres((prev) =>
      prev.filter((_, i) => i !== selectedIndex)
    );
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen p-6 text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">
          Theatre Management
        </h1>

        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-red-600 px-6 py-2.5 rounded-lg font-semibold
                     hover:bg-red-700 transition shadow-lg"
        >
          + Create Theatre
        </button>
      </div>

      {/* EMPTY STATE */}
      {theatres.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center h-72
                     border border-dashed border-gray-600 rounded-xl"
        >
          <p className="text-xl font-semibold text-gray-400">
            No Theatres Found 🎭
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Click “Create Theatre” to add your first theatre
          </p>
        </div>
      ) : (
        /* TABLE */
        <div className="overflow-x-auto rounded-xl border border-gray-700">
          <table className="w-full text-sm">
            <thead className="bg-[#0f172a] text-gray-300">
              <tr>
                <th className="p-4 text-left">S.No</th>
                <th className="p-4 text-left">Theatre</th>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Screen Type</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {theatres.map((theatre, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-700 bg-[#0f172a]
                             hover:bg-[#131c31] transition"
                >
                  <td className="p-4">{index + 1}</td>

                  <td className="p-4 font-semibold">
                    {theatre.name}
                  </td>

                  <td className="p-4">
                    <img
                      src={theatre.image}
                      alt="theatre"
                      className="w-28 h-16 rounded-lg object-cover
                                 border border-gray-600"
                    />
                  </td>

                  <td className="p-4">
                    {theatre.screenType}
                  </td>

                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-3">
                      {/* EDIT */}
                      <button
                        onClick={() => {
                          setSelectedTheatre(theatre);
                          setSelectedIndex(index);
                          setShowUpdateModal(true);
                        }}
                        className="p-2 rounded-full bg-cyan-600/20
                                   hover:bg-cyan-600 transition"
                      >
                        <FiEdit2 />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => {
                          setSelectedIndex(index);
                          setShowDeleteModal(true);
                        }}
                        className="p-2 rounded-full bg-red-600/20
                                   hover:bg-red-600 transition"
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

      {/* CREATE MODAL */}
      {showCreateModal && (
        <CreateTheatre
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateTheatre}
        />
      )}

      {/* UPDATE MODAL */}
      {showUpdateModal && (
        <UpdateTheatre
          theatre={selectedTheatre}
          onClose={() => setShowUpdateModal(false)}
          onUpdate={handleUpdateTheatre}
        />
      )}

      {/* DELETE CONFIRM MODAL */}
      {showDeleteModal && (
        <DeleteConfirmModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDeleteTheatre}
        />
      )}
    </div>
  );
};

export default AdminTheatre;