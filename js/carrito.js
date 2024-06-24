const cardsProductosCarrito = document.getElementById("productosCarrito");
const pagoProductosCarrito = document.getElementById("pagoProductosCarrito");
const tbodyProductosCarrito = document.getElementById(
  "idTbodyProductosCarrito"
);

const eliminarProductoCarrito = (idProducto) => {
  const nuevoCarritoUsuario = usuario.carrito.filter(
    (producto) => producto.id !== idProducto
  );
  usuario.carrito = nuevoCarritoUsuario;
  sessionStorage.setItem("usuario", JSON.stringify(usuario));
  location.reload();
};

if (usuario.carrito.length) {
  tbodyProductosCarrito.innerHTML = usuario.carrito.map(
    (producto) =>
      `
    <tr class="py-3">
      <td>
        <div class="card d-flex flex-row justify-content-center align-items-center gap-2 px-3 border-0">
          <div class="d-flex flex-column align-items-center gap-3 d-md-inline">
            <div class="w-25 img-producto__carrito">
              <img src="${producto.image}" class="card-img-top w-100" alt="${producto.title}">
            </div>
            <button class="bg-transparent border-0 d-md-none d-flex" onclick=eliminarProductoCarrito(${producto.id})><i class="bi bi-x-lg"></i></button>
          </div>
          <div class="card-body">
            <h5 class="producto-nombre fs-2 fw-bold">${producto.title}</h5>
            <p class="producto-categoria fs-4 fw-bold text-secondary">${producto.category}</p>
            <p class="producto-talle fs-3">Talle: <span class="producto-talle fs-3 fw-bold"> ${producto.talle} </span></p>
              <div class="input-group mt-auto d-md-none d-flex">
                <span class="input-group-text fs-3 input-number-control prevent-select" id="idMinusBtnCantidadProductos">-</span>
                <input type="number" class="form-control fs-4 text-center" id="idInputCantidadProductos" value=1>
                <span class="input-group-text fs-3 input-number-control prevent-select" id="idPlusBtnCantidadProductos">+</span>
              </div>
            <p class="producto-precio m-0 fs-3 mx-3 my-3 fw-bold d-md-none d-flex">$${producto.price}</p>
          </div>
        </div>
      </td>
      <td>
        <div class="input-group mt-auto d-none d-md-flex">
          <span class="input-group-text fs-3 input-number-control prevent-select" id="idMinusBtnCantidadProductos">-</span>
          <input type="number" class="form-control fs-4 text-center" id="idInputCantidadProductos" value=1>
          <span class="input-group-text fs-3 input-number-control prevent-select" id="idPlusBtnCantidadProductos">+</span>
        </div>
      </td>
      <td class="d-flex flex-column align-items-center justify-content-between d-md-table-cell">
        <p class="producto-precio m-0 fs-3 mx-3 fw-bold d-none d-md-flex">$${producto.price}</p>
      </td>
      <td class="ms-3 d-none d-md-table-cell"><button class="bg-transparent border-0" onclick=eliminarProductoCarrito(${producto.id})><i class="bi bi-x-lg"></i></button></td>
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
        (inputCantidadProductos.value =
          Number(inputCantidadProductos.value) - 1);
    });
  plusBtnCantidadProductos !== null &&
    plusBtnCantidadProductos.addEventListener("click", () => {
      inputCantidadProductos.value = Number(inputCantidadProductos.value) + 1;
    });

  const subtotalCarrito = document.getElementById("idSubtotalProductosCarrito");
  const totalCarrito = document.getElementById("idTotalProductosCarrito");
  const ivaSubtotalCarrito = document.getElementById("idIVAProductosCarrito");

  const calcularSubtotalCarrito = () => {
    let total = 0;
    usuario.carrito.map((producto) => {
      total = Number(total) + Number(producto.price);
    });
    return total.toFixed(2);
  };

  const calcularIVACarrito = () => {
    let total = 0;
    usuario.carrito.map((producto) => {
      total = total + Number(producto.price);
    });
    return (total * 0.21).toFixed(2);
  };

  const calcularTotalCarrito = () => {
    let total = 0;
    usuario.carrito.map((producto) => {
      total = total + Number(producto.price);
      total = total * 1.21;
    });
    return total.toFixed(2);
  };

  subtotalCarrito.innerHTML = `$${calcularSubtotalCarrito()}`;
  ivaSubtotalCarrito.innerHTML = `$${calcularIVACarrito()}`;
  totalCarrito.innerHTML = `$${calcularTotalCarrito()}`;
} else {
  const mainCarrito = document.getElementById("idMainCarrito");
  mainCarrito.innerHTML = `
  
    <div class="d-flex flex-column align-items-center align-items-md-start gap-4">
      <h2 class="carrito-vacio-titulo">Su carrito esta vacio</h2>
      <p class="fs-3"> Para seguir comprando, navegar por las categorías en el sitio, o busque su producto.</p>
      <button class="btn-redirigir-carrito text-uppercase" onclick=' (function(){ location.href = "./productos.html"; })();'>Ver productos</button>
    </div>
  
  
  `;
}
