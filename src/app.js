import express from 'express';
import productsRouter from './Routes/productsRouter.js';
import cartsRouter from './Routes/cartsRouter.js';
import config from './Configs/config.js';
import {viewRouter} from './Routes/viewsRouter.js'
import handlebars from 'express-handlebars'
import logger from 'morgan';

const app = express();

// Middleware para el manejo de JSON en las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'))

//Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');



// Rutas para productos y carritos
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.use("/",viewRouter)

// Ruta estática para servir archivos estáticos
app.use('/static', express.static(`${config.DIRNAME}/public`));



// Iniciar el servidor
app.listen(config.PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${config.PORT}/`);
});
