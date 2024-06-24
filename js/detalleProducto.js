const id = location.search.split("=")[1];
const productosLocalStorage = JSON.parse(localStorage.getItem("productos"));
const detallesProducto = document.getElementById("detallesProducto") || [];
const productosSeleccionado = productosLocalStorage.find(
  (producto) => producto.id === Number(id)
);
let talleSeleccionado = "no especificado";

detallesProducto.innerHTML = `  

  <section class="container row d-flex mt-5">
        <article class="row col-sm-12 col-md-7 my-5">
          <div class="col-sm-12 col-md-8 text-center w-100 mb-5">
            <img class="w-75" src="${productosSeleccionado.image}" alt="${
  productosSeleccionado.title
}" >
          </div>
          <p class="fs-2 my-2 mx-auto descripcion-producto" >${
            productosSeleccionado.description
          }</p>
        </article>
          
        <div class="col-sm-12 col-md-5 position-sticky ps-5">
          <aside>
          <h6 class="fw-semibold fs-2">Originals</h6>
          <h3 class="fw-bolder fs-1">${productosSeleccionado.title}</h3>
          <p class="fw-semibold fs-2">$${productosSeleccionado.price}</p>
          <p class="fw-semibold fs-2">Talles</p>
          <div class="container row" id="idBtnGroupTalles"></div>
          <div class="d-flex justify-content-around gap-3 mt-5 w-100">
            <button type="button" class="btn-agregar-carrito btn-primary text-uppercase w-75 fs-2" onclick="agregarProductoCarrito(${
              productosSeleccionado.id
            })">Agregar al carrito</button>
            <button type="button" class="btn text-uppercase ${
              usuario ? "" : "d-none"
            }" onclick="agregarProductoFavoritos(${
  productosSeleccionado.id
})"><i class="bi ${
  usuario
    ? usuario.favoritos.filter(
        (producto) => producto.id === productosSeleccionado.id
      ).length
      ? "bi-heart-fill"
      : "bi-heart"
    : ""
} pe-5 btn-favorito"></i></button>
          </div>
          </aside>
        </div>

  </section>



`;

location.href = "#detallesProducto";

const btnGroupTalles = document.getElementById("idBtnGroupTalles") || null;

btnGroupTalles.innerHTML = productosSeleccionado.tallesDisponibles
  .map((talle) => {
    return `
  <button type="button" class="btn-talle border border-dark-subtle shadow-sm p-3 fs-3 rounded-pill col-3 col-lg-2 mx-3 g-3" onclick="seleccionarTalle(${talle})" id="idBtnTalle${talle}">${talle}</button>
  `;
  })
  .join("");

const seleccionarTalle = (talle) => {
  talleSeleccionado = talle;
  arrayBtnTalle = document.querySelectorAll(".btn-talle--activo");
  arrayBtnTalle.forEach((btn) => btn.classList.remove("btn-talle--activo"));
  const btnTalle = document.getElementById("idBtnTalle" + talle);
  btnTalle.classList.add("btn-talle--activo");
};

const agregarProductoCarrito = (idProducto) => {
  if (usuario) {
    const existeProductoCarrito = usuario.carrito.filter(
      (producto) => producto.id === idProducto
    );

    if (!existeProductoCarrito.length) {
      usuario.carrito.push({
        ...productosSeleccionado,
        talle: talleSeleccionado,
        cantidad: 1,
      });
      sessionStorage.setItem("usuario", JSON.stringify(usuario));
      customAlertCaller(
        "Producto añadido a Carrito",
        "Su producto se agrego al carrito con exito.",
        "notification"
      );
      setTimeout(() => location.reload(), 2000);
    } else {
      customAlertCaller(
        "Ya tiene el producto en su Carrito",
        "Este producto ya se encuentra en el carrito",
        "notification"
      );
    }
  } else {
    customAlertCaller(
      "Debe Iniciar Sesión",
      "Debe ser un usuario registrado para añadir productos al carrito",
      "notification"
    );
    location.href = "./login-registro.html";
  }
};

const agregarProductoFavoritos = (idProducto) => {
  const existeProductoFavoritos = usuario.favoritos.filter(
    (producto) => producto.id === idProducto
  );

  if (!existeProductoFavoritos.length) {
    usuario.favoritos.push({
      ...productosSeleccionado,
      talle: talleSeleccionado,
    });
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    location.reload();
  } else {
    usuario.favoritos = usuario.favoritos.filter(
      (producto) => producto.id !== idProducto
    );
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    location.reload();
  }
};
