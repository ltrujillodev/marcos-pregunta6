const productosDisponibles = [
    { id: 1, nombre: 'Aceite(x3)', precio: 1000 },
    { id: 2, nombre: 'llanta(x6)', precio: 2000 },
    { id: 3, nombre: 'timon(x2)', precio: 500 },
    { id: 4, nombre: 'Engranaje(x5)', precio: 1500 }
];

let carrito = [];

// Función para añadir productos al carrito
function agregarAlCarrito(productId) {
    const producto = productosDisponibles.find(p => p.id === parseInt(productId));
    if (producto) {
        carrito.push(producto);
        actualizarCarrito();
    }
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1); // Elimina el producto en el índice seleccionado
    actualizarCarrito();
}

// Función para actualizar el carrito y mostrar el resumen
function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';

    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${producto.nombre} - S/. ${producto.precio}
                        <span class="btn-eliminar" onclick="eliminarDelCarrito(${index})">&nbsp;&nbsp;&nbsp;[Eliminar]</span>`;
        listaCarrito.appendChild(li);
    });

    // Cálculos del carrito
    const subtotal1 = carrito.reduce((total, producto) => total + producto.precio, 0);
    const descuento = subtotal1 > 3000 ? subtotal1 * 0.10 : 0;
    const subtotal2 = subtotal1 - descuento;
    const igv = subtotal2 * 0.18;
    const totalAPagar = subtotal2 + igv;

    // Mostrar los resultados en la página
    document.getElementById('subtotal1').textContent = subtotal1.toFixed(2);
    document.getElementById('descuento').textContent = descuento.toFixed(2);
    document.getElementById('subtotal2').textContent = subtotal2.toFixed(2);
    document.getElementById('igv').textContent = igv.toFixed(2);
    document.getElementById('total').textContent = totalAPagar.toFixed(2);
}

// Manejo del formulario para agregar productos al carrito
document.getElementById('producto-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const productoId = document.getElementById('producto').value;
    agregarAlCarrito(productoId);
});