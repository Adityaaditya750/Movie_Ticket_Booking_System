import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

const AdminManageUsers = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul@gmail.com",
      phone: "9123456780",
      role: "user",
      profile:
        "https://cdn-icons-png.flaticon.com/512/847/847969.png",
    },
    {
      id: 2,
      name: "Anita Sharma",
      email: "anita@gmail.com",
      phone: "9876501234",
      role: "user",
      profile:
        "https://cdn-icons-png.flaticon.com/512/847/847969.png",
    },
    
  ]);

  /* DELETE USER */
  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="min-h-screen p-2 text-white overflow-y-auto scroll-smooth">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold text-black">Users</h1>
          <p className="text-sm text-gray-400">
            Manage registered platform users
          </p>
        </div>
      </div>

      {/* TABLE WRAPPER */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#1b2638] to-[#0b1220]">
        <table className="w-full text-sm">
          {/* TABLE HEADER */}
          <thead>
            <tr className="text-gray-300 border-b border-white/10">
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Phone</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-white/10
                           hover:bg-white/5 transition-colors duration-300"
              >
                {/* NAME + PROFILE */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.profile}
                      alt="profile"
                      className="w-10 h-10 rounded-full border border-white/20"
                    />
                    <span className="font-medium">
                      {user.name}
                    </span>
                  </div>
                </td>

                {/* EMAIL */}
                <td className="px-6 py-4 text-gray-200">
                  {user.email}
                </td>

                {/* PHONE */}
                <td className="px-6 py-4 text-gray-200">
                  {user.phone}
                </td>

                {/* ROLE */}
                <td className="px-6 py-4">
                  <span className="px-4 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400">
                    {user.role}
                  </span>
                </td>

                {/* DELETE ACTION */}
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-2 rounded-lg bg-red-600/20
                               hover:bg-red-600 transition-colors duration-300"
                    title="Delete User"
                  >
                    <FiTrash2 className="text-red-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManageUsers;
