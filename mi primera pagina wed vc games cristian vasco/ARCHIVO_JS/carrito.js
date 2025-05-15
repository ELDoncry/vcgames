 let carrito = [];

document.addEventListener("DOMContentLoaded", function () {
  const carritoGuardado = localStorage.getItem("carritoVCGames");
if (carritoGuardado) {
  carrito = JSON.parse(carritoGuardado);
  actualizarCarrito();
}

  document.querySelectorAll(".agregar-carrito").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const nombre = btn.dataset.nombre;
      const precio = parseInt(btn.dataset.precio);
      const imagen = btn.dataset.imagen;

      const producto = carrito.find(p => p.id === id);
      if (producto) {
        producto.cantidad++;
      } else {
        carrito.push({ id, nombre, precio, cantidad: 1, imagen });
      }

      actualizarCarrito();
    });
  });

  document.getElementById("verCarrito").addEventListener("click", () => {
    document.getElementById("carrito-panel").classList.remove("oculto");
  });

  document.getElementById("cerrar-carrito").addEventListener("click", () => {
    document.getElementById("carrito-panel").classList.add("oculto");
  });

  document.getElementById("vaciar-carrito").addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
  });
});

function actualizarCarrito() {
  const carritoItems = document.getElementById("carrito-items");
  const totalSpan = document.getElementById("total-carrito");
  const cantidadSpan = document.getElementById("cantidad-carrito");
  carritoItems.innerHTML = "";

  let total = 0;
  let cantidadTotal = 0;

  carrito.forEach(producto => {
    const item = document.createElement("div");
    item.className = "item-carrito";
    item.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" width="40">
      <div>
        <strong>${producto.nombre}</strong><br>
        $${producto.precio.toLocaleString()} x ${producto.cantidad} = $${(producto.precio * producto.cantidad).toLocaleString()}
        <div class="cantidad-controles">
          <button onclick="cambiarCantidad('${producto.id}', 1)">+</button>
          <button onclick="cambiarCantidad('${producto.id}', -1)">-</button>
          <button onclick="eliminarProducto('${producto.id}')">🗑️</button>
        </div>
      </div>
    `;
    carritoItems.appendChild(item);
    total += producto.precio * producto.cantidad;
    cantidadTotal += producto.cantidad;
  });

  totalSpan.textContent = total.toLocaleString();
  cantidadSpan.textContent = cantidadTotal;
    const cantidadBtn = document.getElementById("cantidad-carrito-btn");
  if (cantidadBtn) {
    cantidadBtn.textContent = cantidadTotal;
  }
  const cantidadProductos = document.getElementById("cantidad-productos");
if (cantidadProductos) {
  cantidadProductos.textContent = cantidadTotal;
}
   localStorage.setItem("carritoVCGames", JSON.stringify(carrito));
}

function cambiarCantidad(id, cambio) {
  const producto = carrito.find(p => p.id === id);
  if (!producto) return;
  producto.cantidad += cambio;
  if (producto.cantidad <= 0) {
    carrito = carrito.filter(p => p.id !== id);
  }
  actualizarCarrito();
}

function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id !== id);
  actualizarCarrito();
}

function comprar() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío. Agrega productos antes de comprar.");
    return;
  }

  alert("¡COMPRA EXITOSA Gracias por tu compra ¡ 🛒🎉");
  carrito = [];
  actualizarCarrito();
}

