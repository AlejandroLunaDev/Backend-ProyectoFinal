const BASE_URL = 'http://localhost:8080'; // Reemplaza con la URL base de tu backend

export const getProducts = async (page = 1, limit = 10, sortOrder = 'desc', sortBy = 'created_at') => {
  try {
    const url = `${BASE_URL}/api/products/paginate?page=${page}&limit=${limit}&sort=${sortOrder}&sortBy=${sortBy}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};


export const updateProduct = async (productId, productData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(productData),
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${productId}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${productId}`);
    if (!response.ok) {
      throw new Error('Error al obtener el producto por ID');
    }
    const data = await response.json();
  
    return data;
  } catch (error) {
    console.error('Error al obtener el producto por ID:', error);
    throw error;
  }
};

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