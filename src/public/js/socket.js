const socket = io();

socket.on('connect', () => {
    console.log('Conectado al servidor de Socket.IO');
});

socket.on('newProduct', (product) => {
    // Obtener el contenedor de la lista de productos en tiempo real
    const productList = document.querySelector('#realTimeProductList ul');

    // Crear un nuevo elemento de lista para el nuevo producto
    const productItem = document.createElement('li');
    productItem.innerHTML = `
        <span>Id: <small>${product.id}</small></span>
        <span>Título: <small>${product.title}</small></span>
        <span>Precio: <small>${product.price}</small></span>
        <span>Stock: <small>${product.stock}</small></span>
    `;

    // Agregar el nuevo producto a la lista de productos en tiempo real
    productList.appendChild(productItem);
});
