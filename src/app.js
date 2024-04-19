import express from 'express';
import productsRouter from './Routes/productsRouter.js';
import cartsRouter from './Routes/cartsRouter.js';
import config from './Configs/config.js';

const app = express();

// Middleware para el manejo de JSON en las solicitudes
app.use(express.json());

// Rutas para productos y carritos
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Ruta estática para servir archivos estáticos
app.use('/static', express.static(`${config.DIRNAME}/public`));

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send(
    `
    <h1>¡Bienvenido a la primera Entrega de mi Proyecto Final!</h1>
    <ul>
    <li>
    <h2>Has Click para ver todos los productos =>  <a href='http://localhost:8080/api/products'>http://localhost:8080/api/products</a><h2>
    <small>Puedes usar esta misma ruta para agregar productos</small>
    </li>
    <li>   
    <h2>Has Click para ver todos los carritos =>  <a href='http://localhost:8080/api/carts'>http://localhost:8080/api/carts</a><h2>
    <small>Puedes usar esta misma ruta para agregar carritos</small>
    </li>
    </ul>
    `);
});

// Iniciar el servidor
app.listen(config.PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${config.PORT}/`);
});
