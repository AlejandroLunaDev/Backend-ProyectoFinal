import  { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ prevLink: '', nextLink: '' });
  const [cartId, setCartId] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/sessions/current');
      const user = await response.json();
      setCartId(user.payload.cartId);
      getProducts('/api/products/paginate');
    };

    fetchUser();
  }, []);

  const getProducts = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.products);
      setPagination({ prevLink: data.prevLink, nextLink: data.nextLink });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (url) => {
    if (url) {
      getProducts(url);
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
      });
      const data = await response.json();
      Toastify({
        text: data.msg,
        duration: 3000,
        gravity: 'bottom',
        position: 'right',
        style: {
          background: 'linear-gradient(to right, #00b09b, #96c93d)',
        },
      }).showToast();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.code}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => addToCart(product._id)}
                    color="primary"
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-between mt-4">
        <Button
          variant="contained"
          color="primary"
          disabled={!pagination.prevLink}
          onClick={() => handlePageChange(pagination.prevLink)}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!pagination.nextLink}
          onClick={() => handlePageChange(pagination.nextLink)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Product;
