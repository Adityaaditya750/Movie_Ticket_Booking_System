import React, { useState } from "react";

const CreateMovieModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    language: "",
    genreText: "",
    posterFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "poster") {
      setFormData({ ...formData, posterFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const genreArray = formData.genreText
      .split(",")
      .map((g) => g.trim())
      .filter(Boolean);

    if (
      !formData.title ||
      !formData.duration ||
      !formData.language ||
      genreArray.length === 0 ||
      !formData.posterFile
    ) {
      alert("Please fill all required fields");
      return;
    }

    // 🔹 multipart/form-data
    const movieFormData = new FormData();
    movieFormData.append("title", formData.title);
    movieFormData.append("description", formData.description);
    movieFormData.append("duration", Number(formData.duration));
    movieFormData.append("language", formData.language);
    movieFormData.append("genre", JSON.stringify(genreArray)); // array
    movieFormData.append("poster", formData.posterFile); // FILE

    onCreate(movieFormData);
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
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="MOVIE TITLE"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-lg bg-[#020617] px-4 py-3 border border-gray-600 text-white"
          />

          <input
            name="description"
            placeholder="DESCRIPTION"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-lg bg-[#020617] px-4 py-3 border border-gray-600 text-white"
          />

          {/* GENRE */}
          <input
            name="genreText"
            placeholder="GENRES (Action, Drama, Thriller)"
            value={formData.genreText}
            onChange={handleChange}
            className="w-full rounded-lg bg-[#020617] px-4 py-3 border border-gray-600 text-white"
          />

          {/* DURATION */}
          <input
            type="number"
            name="duration"
            placeholder="DURATION (minutes)"
            value={formData.duration}
            onChange={handleChange}
            className="w-full rounded-lg bg-[#020617] px-4 py-3 border border-gray-600 text-white"
          />

          {/* LANGUAGE */}
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full rounded-lg bg-[#020617] px-4 py-3 border border-gray-600 text-white"
          >
            <option value="">SELECT LANGUAGE</option>
            <option value="Odia">Odia</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Telugu">Telugu</option>
            <option value="Tamil">Tamil</option>
            <option value="Malayalam">Malayalam</option>
          </select>

          {/* POSTER FILE */}
          <input
            type="file"
            name="poster"
            accept="image/*"
            onChange={handleChange}
            className="w-full rounded-lg bg-[#020617] px-4 py-3 border border-gray-600 text-gray-300"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 px-6 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-600 px-6 py-2 rounded font-semibold"
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
