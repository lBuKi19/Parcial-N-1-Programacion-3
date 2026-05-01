import { logout } from "../../../utils/auth";
import { authGuard } from "../../../main";
import { PRODUCTS, getCategories } from "../../../data/data";
import type { product } from "../../../types/product";
import type { category } from "../../../types/category";
import { agregarCarrito } from "../cart/cart";

//Carga dinamica de categorias
function cargarCategorias(): void {
  const listaCategorias = document.getElementById("lista-categorias");

  if (!listaCategorias) return;

  const categorias: category[] = getCategories();

  const liTodos = document.createElement("li");
  const aTodos = document.createElement("a");

  aTodos.textContent = "Todas";
  aTodos.href = "#";

  liTodos.appendChild(aTodos);
  listaCategorias.appendChild(liTodos);


  aTodos.addEventListener("click", (e) => {
    e.preventDefault();
    cargarProductos(PRODUCTS);
  });


  categorias.forEach(categoria => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.textContent = categoria.nombre;
    a.href = "#";


    a.addEventListener("click", (e) => {
      e.preventDefault();
      filtrarCategoria(categoria.nombre);
    });


    li.appendChild(a);
    listaCategorias.appendChild(li);
  });
}

// Carga dinamica de productos 
function cargarProductos(productos: product[] = PRODUCTS): void {
  const contenedor = document.getElementById("contenedor-productos");

  if (!contenedor) return;

  contenedor.innerHTML = ""; 

  productos.forEach(producto => {
    const article = document.createElement("article");
    article.classList.add("producto");

    article.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h6>${producto.categorias[0].nombre}</h6>
      <h4>${producto.nombre}</h4>
      <p class="producto-descripcion">${producto.descripcion}</p>

      <div class="precio-boton">
        <span class="precio">$${producto.precio}</span>
        <button class="btn-agregar">AGREGAR</button>
      </div>
    `;

    const boton = article.querySelector<HTMLButtonElement>(".btn-agregar");

    if (boton) {
      boton.addEventListener("click", () => {
        agregarCarrito(
          producto.id,
          producto.nombre,
          producto.descripcion,
          producto.imagen,
          producto.precio
        );
      });
    }

    contenedor.appendChild(article);
  });
}

// Buscador de Productos por nombre
function buscadorProductos(): void {
  const formBusqueda = document.querySelector(".busqueda_productos") as HTMLFormElement;
  const inputBuscador = document.getElementById("buscador") as HTMLInputElement;
  const mensajeNoResultados = document.getElementById("mensaje-no-resultados");

  if (!formBusqueda || !inputBuscador) return;

  formBusqueda.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const textoBusqueda = inputBuscador.value.toLowerCase().trim();

    const productosFiltrados = PRODUCTS.filter(producto =>
      producto.nombre.toLowerCase().includes(textoBusqueda)
    );

    cargarProductos(productosFiltrados);

    if (mensajeNoResultados) {
      mensajeNoResultados.style.display =
        productosFiltrados.length === 0 ? "block" : "none";
    }
  });
}

//Filtrado por categoría
function filtrarCategoria(nombreCategoria: string): void {
  const productosFiltrados = PRODUCTS.filter(producto =>
    producto.categorias.some(
      categoria =>
        categoria.nombre.toLowerCase() === nombreCategoria.toLowerCase()
    )
  );

  cargarProductos(productosFiltrados);

  const mensajeNoResultados = document.getElementById("mensaje-no-resultados");

  if (mensajeNoResultados) {
    mensajeNoResultados.style.display =
      productosFiltrados.length === 0 ? "block" : "none";
  }
}

//Llamado de funciones que se ejecutan al cargar la pagina
authGuard();
cargarProductos();
cargarCategorias();
buscadorProductos();

const buttonLogout = document.getElementById(
  "logoutButton"
) as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => {
  logout();
});


