const BASE_URL = 'http://localhost:8080';

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
        console.log(data);
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const getUserById = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}



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

export const deleteInactiveUsers = async () => {
    try {
        const usersData = await getUsers();
        const users = usersData.users;

        const inactiveUsers = users.filter(user => {
            const lastConnectionDate = new Date(user.last_connection);
            const now = new Date();
            const differenceInDays = (now - lastConnectionDate) / (1000 * 3600 * 24);
            return differenceInDays > 3;
        });

        const deletePromises = inactiveUsers.map(user => deleteUser(user._id));
        await Promise.all(deletePromises);
        console.log(`Deleted ${inactiveUsers.length} inactive users`);
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// services/usersService.js

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
  
  
  
