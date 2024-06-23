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
      <div class="input-group mt-auto ">
        <span class="input-group-text fs-3 input-number-control prevent-select" id="idMinusBtnCantidadProductos">-</span>
        <input type="number" class="form-control fs-4 text-center" id="idInputCantidadProductos" value=1>
        <span class="input-group-text fs-3 input-number-control prevent-select" id="idPlusBtnCantidadProductos">+</span>
      </div>
    </td>
    <td><p class="producto-precio m-0 fs-3 mx-3 fw-bold">$${producto.price}</p></td>
    <th scope="row" class="ms-3"><button class="bg-transparent border-0" onclick=eliminarProductoCarrito(${producto.id})><i class="bi bi-x-lg"></i></button></th>
  </tr>
  `
);

const minusBtnCantidadProductos =
  document.getElementById("idMinusBtnCantidadProductos") || null;
const plusBtnCantidadProductos =
  document.getElementById("idPlusBtnCantidadProductos") || null;
const inputCantidadProductos =
  document.getElementById("idInputCantidadProductos") || null;

minusBtnCantidadProductos !== null &&
  minusBtnCantidadProductos.addEventListener("click", () => {
    inputCantidadProductos.value > 1 &&
      (inputCantidadProductos.value = Number(inputCantidadProductos.value) - 1);
  });
plusBtnCantidadProductos !== null &&
  plusBtnCantidadProductos.addEventListener("click", () => {
    inputCantidadProductos.value = Number(inputCantidadProductos.value) + 1;
  });

const eliminarProductoCarrito = (idProducto) => {
  const nuevoCarritoUsuario = usuario.carrito.filter(
    (producto) => producto.id !== idProducto
  );
  usuario.carrito = nuevoCarritoUsuario;
  sessionStorage("usuario", JSON.stringify(usuario));
};

const subtotalCarrito = document.getElementById("idSubtotalProductosCarrito");
const totalCarrito = document.getElementById("idTotalProductosCarrito");
const ivaSubtotalCarrito = document.getElementById("idIVAProductosCarrito");

const calcularSubtotalCarrito = () => {
  return usuario.carrito.map((producto) => {
    let total = 0;
    total = total + Number(producto.price);
    return total.toFixed(2);
  });
};

const calcularIVACarrito = () => {
  return usuario.carrito.map((producto) => {
    let total = 0;
    total = total + Number(producto.price);
    return (total * 0.21).toFixed(2);
  });
};

const calcularTotalCarrito = () => {
  return usuario.carrito.map((producto) => {
    let total = 0;
    total = total + Number(producto.price);
    total = total * 1.21;
    return total.toFixed(2);
  });
};

subtotalCarrito.innerHTML = `$${calcularSubtotalCarrito()}`;
ivaSubtotalCarrito.innerHTML = `$${calcularIVACarrito()}`;
totalCarrito.innerHTML = `$${calcularTotalCarrito()}`;
