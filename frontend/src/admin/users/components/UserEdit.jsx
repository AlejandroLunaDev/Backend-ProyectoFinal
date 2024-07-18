/* eslint-disable react/prop-types */
// UserEdit.js

import  { useState } from "react";
import { updateUser } from "../services/usersService";

const UserEdit = ({ user, onCancel, onSave }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    await updateUser(editedUser); // Llamar a la función de servicio para actualizar el usuario
    onSave(); // Volver a la lista de usuarios
  };

  return (
    <div className=" h-dvh p-4 bg-white">
      <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
      <form>
        <label className="block mb-2">
          Nombre:
          <input
            type="text"
            name="first_name"
            value={editedUser.first_name}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </label>
        <label className="block mb-2">
          Apellido:
          <input
            type="text"
            name="last_name"
            value={editedUser.last_name}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </label>
        <label className="block mb-2">
          Rol:
          <select
            name="role"
            value={editedUser.role}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option value="user">User</option>
            <option value="premium">Premium</option>
          </select>
        </label>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
