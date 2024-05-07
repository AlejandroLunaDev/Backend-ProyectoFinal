import express from 'express';
import productsRouter from './Routes/productsRouter.js';
/* import cartsRouter from './Routes/cartsRouter.js'; */
import config from './Configs/config.js';
import {viewRouter} from './Routes/viewsRouter.js'
import handlebars from 'express-handlebars'
import logger from 'morgan';
import { Server } from 'socket.io';
/* import userRouter from './Routes/userRouter.js' */
import socket from './public/js/socket.js';
import { connectDB } from './dao/mongoDb.js';

const app = express();
connectDB()

// Middleware para el manejo de JSON en las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'))

//Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');



// Rutas
app.use('/api/products', productsRouter);
/* app.use('/api/carts', cartsRouter); */
app.use("/",viewRouter)
/* app.use("/api/users",userRouter) */

// Ruta estática para servir archivos estáticos
app.use('/static', express.static(`${config.DIRNAME}/public`));



// Iniciar el servidor
const httpServer = app.listen(config.PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${config.PORT}/`);
  config.openBrowser()
});



export const io = new Server(httpServer)
socket(io)
/* app.set('socketServer', io) */




