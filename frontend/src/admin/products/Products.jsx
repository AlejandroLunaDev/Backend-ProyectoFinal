/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  getProducts,
  deleteProduct,
  updateProduct,
  getProductById
} from '../../services/productService';
import { Button, Modal, Box, TextField } from '@mui/material';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortBy, setSortBy] = useState('createdAt');
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [sortOrder, sortBy, currentPage]);

  const fetchProducts = async () => {
    try {
      const response = await getProducts(currentPage, 10);
      if (response) {
        setProducts(response.products);
        setTotalPages(response.totalPages);
      } else {
        console.error('No se recibieron datos válidos.');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const mostrarAlerta = (message, color) => {
    Toastify({
      text: message,
      gravity: 'bottom',
      duration: 2000,
      style: {
        background: color
      }
    }).showToast();
  };

  const handleDeleteProduct = async productId => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter(product => product._id !== productId));
      mostrarAlerta('Producto Eliminado', 'red');
    } catch (error) {
      console.error('Error deleting product:', error);
      mostrarAlerta('Error al eliminar el producto', 'red');
    }
  };

  const handleOpenModal = async productId => {
    try {
      const product = await getProductById(productId);
      const { status, ...cleanProduct } = product; // Filtrar propiedades adicionales como 'status'
      setSelectedProduct(cleanProduct);
      setOpenModal(true);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setOpenModal(false);
  };

  const handleEditProduct = async () => {
    try {
      // Verificar que selectedProduct y selectedProduct.payload estén definidos
      if (
        !selectedProduct ||
        !selectedProduct.payload ||
        !selectedProduct.payload._id
      ) {
        console.error('El producto seleccionado o su _id son inválidos.');
        return;
      }

      // Depuración para verificar el _id antes de la solicitud PUT
      console.log('ID del producto a actualizar:', selectedProduct.payload._id);

      // Llamar a updateProduct con el _id y el producto actualizado
      await updateProduct(selectedProduct.payload._id, selectedProduct.payload);

      // Recargar productos después de la edición
      fetchProducts();
      handleCloseModal();
      mostrarAlerta('Producto Actualizado', '#61005D');
    } catch (error) {
      console.error('Error actualizando el producto:', error);
      mostrarAlerta('Error al actualizar el producto', 'red');
    }
  };

  const handleChangeSortOrder = e => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
  };

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md ${
            currentPage === i
              ? 'bg-[#61005D] text-white'
              : 'bg-white text-black'
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className='container mx-auto mt-8 '>
      <label htmlFor='sortSelect' className='mr-2'>
        Ordenado por:
      </label>
      <select
        id='sortSelect'
        value={sortOrder}
        onChange={handleChangeSortOrder}
        className='mb-4 border p-1 rounded-xl'
      >
        <option value='desc'>Más caro a más barato</option>
        <option value='asc'>Más barato a más caro</option>
      </select>
      <div className='flex justify-center my-5'>
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          className='mx-1 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md bg-white text-black'
        >
          &laquo;
        </button>
        {renderPageNumbers()}
        <button
          onClick={() =>
            handlePageChange(Math.min(totalPages, currentPage + 1))
          }
          className='mx-1 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md bg-white text-black'
        >
          &raquo;
        </button>
      </div>
      <table className='w-full border-collapse border border-gray-300'>
        <thead>
          <tr>
            <th className='border border-gray-300 px-4 py-2'>ID</th>
            <th className='border border-gray-300 px-4 py-2'>Título</th>
            <th className='border border-gray-300 px-4 py-2'>Precio</th>
            <th className='border border-gray-300 px-4 py-2'>Stock</th>
            <th className='border border-gray-300 px-4 py-2'>Categoría</th>
            <th className='border border-gray-300 px-4 py-2'>Fecha</th>
            <th className='border border-gray-300 px-4 py-2'>Imagen</th>
            <th className='border border-gray-300 px-4 py-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map(product => (
              <tr key={product._id}>
                <td className='border border-gray-300 px-4 py-2'>
                  {product._id}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {product.title}
                </td>
                <td className='border border-gray-300 px-4 py-2 font-semibold text-[#61005D]'>
                  {product.price}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {product.stock}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {product.category}
                </td>
                <td className='border border-gray-300 px-4 py-2 text-[#61005D] font-semibold'>
                  {new Date(product.createdAt).toLocaleString()}
                </td>
                <td className='border border-gray-300 px-4 py-2 flex justify-center'>
                  <img
                    className='w-12 h-12'
                    src={product.thumbnails}
                    alt={product.title}
                  />
                </td>
                <td className='border border-gray-300 text-center'>
                  <button
                    onClick={() => handleOpenModal(product._id)}
                    className='bg-blue-500 text-white px-2 py-1 mr-2 rounded-md'
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className='bg-red-500 text-white px-2 py-1 rounded-md'
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='8' className='text-center py-4'>
                No hay productos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className='flex justify-center mt-5'>
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          className='mx-1 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md bg-white text-black'
        >
          &laquo;
        </button>
        {renderPageNumbers()}
        <button
          onClick={() =>
            handlePageChange(Math.min(totalPages, currentPage + 1))
          }
          className='mx-1 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md bg-white text-black'
        >
          &raquo;
        </button>
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4
          }}
        >
          {selectedProduct && (
            <>
              <h2 id='modal-modal-title' className='text-center'>
                Editar Producto
              </h2>
              <div className='flex justify-center'>
                <img
                  className='w-32 h-32 mb-4'
                  src={selectedProduct.payload.thumbnails}
                  alt={selectedProduct.payload.title}
                />
              </div>
              <div className='my-2'>
                <label htmlFor='title' className='block'>
                  Título:
                </label>
                <TextField
                  id='title'
                  fullWidth
                  value={selectedProduct.payload.title}
                  onChange={e =>
                    setSelectedProduct({
                      ...selectedProduct,
                      payload: {
                        ...selectedProduct.payload,
                        title: e.target.value
                      }
                    })
                  }
                  className='my-2'
                />
              </div>
              <div className='my-2'>
                <label htmlFor='price' className='block'>
                  Precio:
                </label>
                <TextField
                  id='price'
                  fullWidth
                  value={selectedProduct.payload.price}
                  onChange={e =>
                    setSelectedProduct({
                      ...selectedProduct,
                      payload: {
                        ...selectedProduct.payload,
                        price: e.target.value
                      }
                    })
                  }
                  className='my-2'
                />
              </div>
              <div className='my-2'>
                <label htmlFor='stock' className='block'>
                  Stock:
                </label>
                <TextField
                  id='stock'
                  fullWidth
                  value={selectedProduct.payload.stock}
                  onChange={e =>
                    setSelectedProduct({
                      ...selectedProduct,
                      payload: {
                        ...selectedProduct.payload,
                        stock: e.target.value
                      }
                    })
                  }
                  className='my-2'
                />
              </div>
              <div className='my-2'>
                <label htmlFor='category' className='block'>
                  Categoría:
                </label>
                <TextField
                  id='category'
                  fullWidth
                  value={selectedProduct.payload.category}
                  onChange={e =>
                    setSelectedProduct({
                      ...selectedProduct,
                      payload: {
                        ...selectedProduct.payload,
                        category: e.target.value
                      }
                    })
                  }
                  className='my-2'
                />
              </div>
              <div className='flex justify-center mt-4'>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleEditProduct}
                  className='mx-2'
                >
                  Guardar Cambios
                </Button>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={handleCloseModal}
                  className='mx-2'
                >
                  Cancelar
                </Button>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Products;
