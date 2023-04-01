// URL de la API de Fake Store
const apiUrl = "https://fakestoreapi.com/products";

// Obtener la lista de productos
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const productos = document.getElementById("productos");
    data.forEach(producto => {
      const li = document.createElement("li");
      li.textContent = `${producto.title} - $${producto.price}`;

      // Agregar imagen del producto
      const img = document.createElement("img");
      img.src = producto.image;
      li.appendChild(img);

      const button = document.createElement("button");
      button.textContent = "Agregar al carrito";
      button.addEventListener("click", () => {
        // Agregar el producto al carrito
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
      });
      li.appendChild(button);
      productos.appendChild(li);
    });
  })
  .catch(error => {
    console.error("Error al obtener la lista de productos:", error);
  });

// Actualizar la lista de productos en el carrito
function actualizarCarrito() {
  const listaCarrito = document.getElementById("lista-carrito");
  listaCarrito.innerHTML = "";
  let totalCarrito = 0;
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.forEach((producto, index) => {
    const li = document.createElement("li");
    li.textContent = `${producto.title} - $${producto.price}`;
    const button = document.createElement("button");
    button.textContent = "Eliminar";
    button.addEventListener("click", () => {
      // Eliminar el producto del carrito
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarCarrito();
    });
    li.appendChild(button);
    listaCarrito.appendChild(li);
    totalCarrito += producto.price;
  });
  const totalCarritoSpan = document.getElementById("total-carrito");
  totalCarritoSpan.textContent = totalCarrito.toFixed(2);
  
  // Botón de comprar
  const comprarButton = document.createElement("button");
  comprarButton.textContent = "Comprar";
  comprarButton.addEventListener("click", () => {
    // Realizar la compra
    localStorage.removeItem("carrito");
    actualizarCarrito();
    Swal.fire({
      title: 'Compra realizada',
      text: `Total: $${totalCarrito.toFixed(2)}`,
      icon: 'success',
      confirmButtonText: 'Cerrar'
    });
  });
  listaCarrito.appendChild(comprarButton);
}

// Vaciar el carrito
const vaciarCarritoButton = document.getElementById("vaciar-carrito");
vaciarCarritoButton.addEventListener("click", () => {
  localStorage.removeItem("carrito");
  actualizarCarrito();
});

// Actualizar la lista de productos en el carrito al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  actualizarCarrito();
});


