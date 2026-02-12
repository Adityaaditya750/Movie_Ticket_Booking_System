import React, { useState } from "react";

const CreateMovieModal = ({ onClose, onCreate }) => {
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    genre: "",
    duration: "",
    language: "",
    poster: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "poster") {
      const file = files[0];
      if (file) {
        setMovieData({
          ...movieData,
          poster: URL.createObjectURL(file),
        });
      }
    } else {
      setMovieData({
        ...movieData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allFieldsFilled = Object.values(movieData).every(
      (value) => value !== ""
    );

    if (!allFieldsFilled) {
      alert("Please fill all fields before creating the movie.");
      return;
    }

    onCreate(movieData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-xl rounded-2xl bg-[#0f172a] p-8 border border-gray-700">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-red-500">
            🎬 Create New Movie
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="MOVIE TITLE"
            value={movieData.title}
            onChange={handleChange}
            className="w-full rounded-lg bg-[#020617] px-4 py-3 border border-gray-600 text-white"
          />

          <input
            type="text"
            name="description"
            placeholder="DESCRIPTION"
            value={movieData.description}
            onChange={handleChange}
            className="w-full rounded-lg bg-[#020617] px-4 py-3 border border-gray-600 text-white"
          />

          {/* GENRE SELECT (UPDATED) */}
          <select
            name="genre"
            value={movieData.genre}
            onChange={handleChange}
            className="w-full rounded-lg bg-[#020617] px-4 py-3 border border-gray-600 text-white"
          >
            <option value="" disabled>
              SELECT GENRE
            </option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Comedy">Comedy</option>
            <option value="Romance">Romance</option>
            <option value="Thriller">Thriller</option>
            <option value="Horror">Horror</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Fantasy">Fantasy</option>
          </select>

          <input
            type="time"
            name="duration"
            value={movieData.duration}
            onChange={handleChange}
            className="w-full rounded-lg bg-[#020617] px-4 py-3 border border-gray-600 text-white"
          />

          {/* LANGUAGE SELECT */}
          <select
            name="language"
            value={movieData.language}
            onChange={handleChange}
            className="w-full rounded-lg bg-[#020617] px-4 py-3 border border-gray-600 text-white"
          >
            <option value="" disabled>
              SELECT LANGUAGE
            </option>
            <option value="Odia">Odia</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Telugu">Telugu</option>
            <option value="Tamil">Tamil</option>
            <option value="Malayalam">Malayalam</option>
          </select>

          {/* FILE INPUT */}
          <input
            type="file"
            name="poster"
            accept="image/*"
            onChange={handleChange}
            className="w-full rounded-lg bg-[#020617] px-4 py-3 border border-gray-600 text-gray-300"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-semibold"
            >
              Create Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMovieModal;
