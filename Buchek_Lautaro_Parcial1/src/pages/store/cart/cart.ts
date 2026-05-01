import type { ItemCarrito } from "../../../types/product";

const STORAGE_KEY = "carrito";

function obtenerCarrito(): ItemCarrito[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function guardarCarrito(carrito: ItemCarrito[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
}

// Agregar productos al carrito
export function agregarCarrito(
  id: number,
  nombre: string,
  descripcion: string,
  imagen: string,
  precio: number
): void {
  const carrito = obtenerCarrito();
  const producto = carrito.find(item => item.id === id);

  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({
      id,
      nombre,
      descripcion,
      imagen,
      precio,
      cantidad: 1
    });
  }

  guardarCarrito(carrito);
  alert("Producto agregado al carrito");
}

// Mostrar carrito en la vista cart.html
function renderizarCarrito(): void {
  const carrito = obtenerCarrito();
  const contenedor = document.getElementById("carrito");
  const totalElemento = document.getElementById("total-carrito");
  const envioElemento = document.getElementById("envio");
  const subtotalElemento = document.getElementById("subtotal");
  const mensajeVacio = document.getElementById("carrito-vacio");
  const resumenPedido = document.querySelector(".resumen-pedido") as HTMLElement;

  if (!contenedor || !totalElemento || !envioElemento || !subtotalElemento || !mensajeVacio) return;


  if (carrito.length === 0) {
    mensajeVacio.style.display = "block";
    resumenPedido.style.display = "none";
    totalElemento.textContent = "";
    envioElemento.textContent = "";
    subtotalElemento.textContent = "";

    return; 
  }


  contenedor.innerHTML = "";

  let total = 0;
  let subtotal = 0;
  let envio = 500;

  carrito.forEach(item => {
    subtotal += item.precio * item.cantidad;

    contenedor.innerHTML += `
      <div class="producto-carrito">
        <div class="imagen-item">
            <img class="imagen-carrito" src="${item.imagen}" alt="${item.nombre}">
        </div>
        <div class="item">
            <h5>${item.nombre}</h5>
            <p class="item-descripcion">${item.descripcion}</p>
            <p class="item-precio">$${item.precio}     c/u</p>
        </div>
        <div class="item-cantidad">
          <p>Cantidad: ${item.cantidad}</p>
        </div>
      </div>
    `;
  });

  total = subtotal + envio;
  envioElemento.textContent = `$${envio}`;
  subtotalElemento.textContent = `$${subtotal}`;
  totalElemento.textContent = `Total: $${total}`;
}


document.addEventListener("DOMContentLoaded", renderizarCarrito);