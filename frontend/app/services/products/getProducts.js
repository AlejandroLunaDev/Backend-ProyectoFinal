const BASE_URL = 'http://localhost:8080';
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