const cardsProductosCarrito = document.getElementById("productosCarrito");
const pagoProductosCarrito = document.getElementById("pagoProductosCarrito");
const tbodyProductosCarrito = document.getElementById(
  "idTbodyProductosCarrito"
);

console.log(usuario.carrito);

tbodyProductosCarrito.innerHTML = usuario.carrito.map(
  (producto) =>
    `
  <tr class="py-3">
    <td>
      <div class="card d-flex flex-row justify-content-center align-items-center gap-2 px-3 border-0">
        <div class="w-25 img-producto__carrito">
          <img src="${producto.image}" class="card-img-top w-100" alt="${producto.title}">
        </div>
        <div class="card-body">
          <h5 class="producto-nombre fs-2 fw-bold">${producto.title}</h5>
          <p class="producto-categoria fs-4 fw-bold text-secondary">${producto.category}</p>
        </div>
      </div>
    </td>
    <td>
      <div class="input-group mt-auto">
        <span class="input-group-text">-</span>
        <input type="number" class="form-control">
        <span class="input-group-text">+</span>
      </div>
    </td>
    <td><p class="producto-precio m-0 fs-3 mx-3">$${producto.price}</p></td>
    <th scope="row"><i class="bi bi-x-lg"></i></th>
  </tr>
  `
);
