import React, { useState } from "react";

const CreateTheatre = ({ onClose, onCreate }) => {
  const [theatreData, setTheatreData] = useState({
    name: "",
    screenType: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      if (file) {
        setTheatreData({
          ...theatreData,
          image: URL.createObjectURL(file),
        });
      }
    } else {
      setTheatreData({
        ...theatreData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allFilled = Object.values(theatreData).every(
      (v) => v !== ""
    );

    if (!allFilled) {
      alert("Please fill all fields");
      return;
    }

    onCreate(theatreData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="w-full max-w-lg bg-[#0f172a] rounded-2xl p-8 border border-gray-700">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-red-500">
            Create Theatre
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
          
          {/* THEATRE NAME */}
          <input
            type="text"
            name="name"
            placeholder="Theatre Name"
            onChange={handleChange}
            className="w-full bg-[#020617] px-4 py-3 rounded-lg
                       border border-gray-600 text-white"
          />

          {/* SCREEN TYPE */}
          <select
            name="screenType"
            onChange={handleChange}
            className="w-full bg-[#020617] px-4 py-3 rounded-lg
                       border border-gray-600 text-white"
          >
            <option value="">Select Screen Type</option>
            <option value="2D">2D</option>
            <option value="3D">3D</option>
            <option value="IMAX">IMAX</option>
            <option value="4DX">4DX</option>
          </select>

          {/* THEATRE IMAGE */}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full bg-[#020617] px-4 py-3 rounded-lg
                       border border-gray-600 text-gray-400"
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
              className="px-6 py-2 rounded bg-red-600
                         hover:bg-red-700 font-semibold"
            >
              Create
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateTheatre;