export default(io) => {
    io.on('connection', (socket) => {
        console.log(`Se ha conectado un cliente con el id ${socket.id}`);
    
        socket.on('nuevo-usuario', (data) => {
            console.log('Nuevo usuario encontrado', data);
        })
    
        socket.on('disconnect', () => {
            console.log('Se ha desconectado un cliente');
        })
    
        socket.on('message', async (data) => {
            io.emit('message', { userName: data.userName, message: data.message });
        });

        socket.on('addProduct', productData => {

            console.log('Nuevo producto recibido desde el cliente:', productData);
        
            // Emite el evento 'newProduct' a todos los clientes conectados
            io.emit('newProduct', productData);
          });
        
    })
}