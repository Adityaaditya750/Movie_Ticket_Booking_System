import React, { useState, useEffect } from "react";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import EditMovieModal from "../modals/EditMovieModal";
import DeleteModal from "../modals/DeleteMovie";
import CreateMovieModal from "../modals/CreateMovieModal";

const AdminMovie = () => {
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem("movies");
    return saved ? JSON.parse(saved) : [];
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  /* CREATE */
  const handleCreateMovie = (movie) => {
    setMovies((prev) => [...prev, { ...movie, id: Date.now() }]);
    setShowCreateModal(false);
  };

  /* EDIT */
  const handleEditMovie = (updatedMovie) => {
    setMovies((prev) =>
      prev.map((m) =>
        m.id === updatedMovie.id ? updatedMovie : m
      )
    );
    setShowEditModal(false);
  };

  /* DELETE */
  const handleDeleteMovie = () => {
    setMovies((prev) =>
      prev.filter((m) => m.id !== selectedMovie.id)
    );
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen p-6 text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold tracking-wide text-black">
          Movie Management
        </h1>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700
                     px-5 py-2 rounded-lg transition-all duration-300
                     hover:scale-105 shadow-lg"
        >
          <FiPlus />
          Create Movie
        </button>
      </div>

      {/* MOVIE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="group relative bg-[#0b1220] rounded-2xl
                       border border-white/10
                       transition-all duration-300
                       hover:-translate-y-1
                       hover:border-red-700
                       hover:shadow-[0_8px_22px_rgba(239,68,68,0.30)]"
          >
            {/* POSTER */}
            <div className="relative h-48 rounded-t-2xl overflow-hidden bg-black">
              <img
                src={movie.poster}
                alt=""
                className="absolute inset-0 w-full h-full
                           object-cover blur-xl scale-110
                           opacity-40 z-0"
              />

              <img
                src={movie.poster}
                alt={movie.title}
                className="relative z-10 mx-auto h-full object-contain"
              />

              <div className="absolute inset-0 bg-black/30
                              opacity-0 group-hover:opacity-100
                              transition z-20 pointer-events-none" />

              {/* ACTION BUTTONS */}
              <div
                className="absolute top-3 right-3 flex gap-2
                           opacity-0 group-hover:opacity-100
                           translate-y-1 group-hover:translate-y-0
                           transition-all duration-300 z-40"
              >
                <button
                  onClick={() => {
                    setSelectedMovie(movie);
                    setShowEditModal(true);
                  }}
                  className="p-2 rounded-full bg-black/80
                             hover:bg-red-600 transition"
                >
                  <FiEdit size={14} />
                </button>

                <button
                  onClick={() => {
                    setSelectedMovie(movie);
                    setShowDeleteModal(true);
                  }}
                  className="p-2 rounded-full bg-black/80
                             hover:bg-red-600 transition"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>

            {/* DETAILS */}
            <div className="p-4 text-sm space-y-1">
              <p>
                <span className="text-gray-400">Title:</span> {movie.title}
              </p>
              <p>
                <span className="text-gray-400">Genre:</span> {movie.genre}
              </p>
              <p className="line-clamp-2">
                <span className="text-gray-400">Description:</span>{" "}
                {movie.description}
              </p>
              <p>
                <span className="text-gray-400">Duration:</span>{" "}
                {movie.duration}
              </p>
              <p>
                <span className="text-gray-400">Language:</span>{" "}
                {movie.language}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* MODALS */}
      {showCreateModal && (
        <CreateMovieModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateMovie}
        />
      )}

      {showEditModal && (
        <EditMovieModal
          movie={selectedMovie}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleEditMovie}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          title={selectedMovie?.title}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteMovie}
        />
      )}
    </div>
  );
};

export default AdminMovie;
