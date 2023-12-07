let productosEnCarrito = localStorage.getItem("productosEnCarrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carVacio");
const contenedorCarritoProductos = document.querySelector("#carritoProductos");
const contenedorCarritoAcciones = document.querySelector("#carAcciones");
const contenedorCarritoComprado = document.querySelector("#carComprado");
let botonesEliminar = document.querySelectorAll(".botonCarEliminar");
const botonVaciar = document.querySelector("#carAccionVaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carAccioncomprar")


function cargarProductosCarrito(){
    if (productosEnCarrito && productosEnCarrito.length > 0) {
    
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled")
        contenedorCarritoAcciones.classList.remove("disabled")
        contenedorCarritoComprado.classList.add("disabled")
        
        contenedorCarritoProductos.innerHTML = "";
        
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carritoProducto");
            div.innerHTML= `
                <img class="carProdImg" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carProdTitulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carProdCantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carProdPrecio">
                    <small>Precio</small>
                    <p>${producto.precio}</p>
                </div>
                <div class="carProdSubTotal">
                    <small>Subtotal</small>
                    <p>${producto.precio * producto.cantidad}</p>
                </div>
                <button class="botonCarEliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>
            `
        
            contenedorCarritoProductos.append(div);
        
        })
        }else{
        
            contenedorCarritoVacio.classList.remove("disabled");
            contenedorCarritoProductos.classList.add("disabled")
            contenedorCarritoAcciones.classList.add("disabled")
            contenedorCarritoComprado.classList.add("disabled")
        
        }  

    actualizarBotonesEliminar();
    actualizarTotal()
}

cargarProductosCarrito();

function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".botonCarEliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    })
}

function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){

    productosEnCarrito.length = 0 ;
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito(){

    productosEnCarrito.length = 0 ;
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
   
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled")
    contenedorCarritoAcciones.classList.add("disabled")
    contenedorCarritoComprado.classList.remove("disabled")
}