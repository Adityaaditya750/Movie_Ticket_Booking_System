import React, { useState, useEffect } from "react";

const UpdateTheatre = ({ theatre, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    screenType: "",
    image: "",
  });

  useEffect(() => {
    if (theatre) {
      setFormData(theatre);
    }
  }, [theatre]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      if (file) {
        setFormData({
          ...formData,
          image: URL.createObjectURL(file),
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="w-full max-w-lg bg-[#0f172a] p-8 rounded-2xl border border-gray-700">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-cyan-400">
            ✏️ Update Theatre
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-lg"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Theatre Name"
            className="w-full bg-[#020617] px-4 py-3 rounded-lg border border-gray-600"
          />

          <select
            name="screenType"
            value={formData.screenType}
            onChange={handleChange}
            className="w-full bg-[#020617] px-4 py-3 rounded-lg border border-gray-600 text-white"
          >
            <option value="">Select Screen Type</option>
            <option value="2D">2D</option>
            <option value="3D">3D</option>
            <option value="IMAX">IMAX</option>
            <option value="4DX">4DX</option>
          </select>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full bg-[#020617] px-4 py-3 rounded-lg border border-gray-600 text-gray-400"
          />

          {/* ACTIONS */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded bg-gray-700 hover:bg-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded bg-cyan-600 hover:bg-cyan-700 font-semibold"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTheatre;