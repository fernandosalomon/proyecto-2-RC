const nombreUsuarioCuentaUsuario = document.getElementById(
  "idNombreUsuarioCuentaUsuario"
);
const ventanaLateral = document.getElementById("idVentanaLateralCU");
const btnBarraLateralPerfil = document.getElementById(
  "idBtnBarraLateralPerfil"
);
const btnBarraLateralDirecciones = document.getElementById(
  "idBtnBarraLateralDirecciones"
);
const btnBarraLateralPedidos = document.getElementById(
  "idBtnBarraLateralPedidos"
);
const btnBarraLateralFavoritos = document.getElementById(
  "idBtnBarraLateralFavoritos"
);
const btnBarraLateralSalir = document.getElementById("idBtnBarraLateralSalir");

// nombreUsuarioCuentaUsuario.innerHTML = `¡Hola ${usuario.nombre.split(" ")}!`;

btnBarraLateralFavoritos.addEventListener("click", () => {
  ventanaLateral.classList.add("row");
  ventanaLateral.classList.add("g-5");
  if (usuario.favoritos.length) {
    ventanaLateral.innerHTML = usuario.favoritos.map(
      (producto) =>
        `
            <div class="card-container col-12 col-sm-5 col-lg-3">
              <div class="card d-flex justify-content-center px-3 border-0 ">
                <div class="card-img-container my-3 py-5 px-3 mx-auto bg-body-tertiary">
                  <img src="${producto.image}" class="card-img-top mx-auto" alt="${producto.title}">
                  <div class="btn-eliminar-favorito-container"><button class="border-0 bg-transparent" onclick=eliminarProductoFavorito(${producto.id})><i class="bi bi-trash"></i></button></div>
                </div>
                <div class="card-body">
                  <h5 class="producto-nombre fs-2 fw-bold w-100">${producto.title}</h5>
                  <div class="w-100 d-flex justify-content-center">
                    <button type="button" class="btn-comprar-favorito text-uppercase mx-auto" onclick=agregarProductoCarrito(${producto.id})>Agregar al carrito</button>
                  </div>
                </div>
              </div>
            </div>
      
            
        `
    );
  } else {
    ventanaLateral.innerHTML = `

      <div class="d-flex flex-column align-items-center align-items-md-start gap-4">
        <h2 class="favoritos-vacio-titulo">No tiene productos en Favoritos</h2>
        <p class="fs-3"> ¡Encuentre los mejores productos en nuestro sitio!</p>
        <button class="btn-redirigir-favoritos text-uppercase" onclick=' (function(){ location.href = "./productos.html"; })();'>Ver productos</button>
      </div>


      `;
  }
});

btnBarraLateralSalir.addEventListener("click", () => {
  sessionStorage.removeItem("usuario");
  setTimeout(() => {
    location.href = "../index.html";
  }, 1000);
});

btnBarraLateralPerfil.addEventListener("click", () => {});

const eliminarProductoFavorito = (idProducto) => {
  const nuevoFavoritosUsuario = usuario.favoritos.filter(
    (producto) => producto.id !== idProducto
  );
  usuario.favoritos = nuevoFavoritosUsuario;
  sessionStorage.setItem("usuario", JSON.stringify(usuario));
  location.reload();
};

const agregarProductoCarrito = (idProducto) => {
  const existeProductoCarrito = usuario.carrito.filter(
    (producto) => producto.id === idProducto
  );

  const productosSeleccionado = usuario.favoritos.filter(
    (producto) => producto.id === idProducto
  );

  if (!existeProductoCarrito.length) {
    usuario.carrito.push(productosSeleccionado);
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    location.reload();
  } else {
    alert("El producto ya se encuenctra en el carrito");
  }
};
