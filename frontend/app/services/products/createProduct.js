const BASE_URL = 'http://localhost:8080'; // Reemplaza con la URL base de tu backend
export const createProduct = async (newProduct) => {
    try {
      const response = await fetch(`${BASE_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al crear el producto:', error);
      throw error;
    }
  };