const BASE_URL = 'http://localhost:8080';

export const getAdminUsers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/users/admin`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch admin users');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to delete user');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

export const updateUserRole = async (userId, newRole) => {
    try {
      const response = await fetch(`${BASE_URL}/api/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ role: newRole }), // Asegúrate de enviar el rol correctamente
      });
      if (!response.ok) {
        throw new Error('Failed to update user role');
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  export const getUsers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/users`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};