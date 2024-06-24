const nombreUsuarioCuentaUsuario = document.getElementById(
  "idNombreUsuarioCuentaUsuario"
);
const ventanaLateral = document.getElementById("idVentanaLateralCU");
const btnBarraLateralPerfil = document.getElementById(
  "idBtnBarraLateralPerfil"
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

btnBarraLateralPerfil.addEventListener("click", () => {
  ventanaLateral.innerHTML = `
    <form class="row g-3 w-75">
          <div class="col-12">
            <label for="inputNombreUsuario" class="form-label fs-3">Nombre</label>
            <input type="text" class="form-control fs-3" id="inputNombreUsuario" value="${
              usuario.nombre
            }">
            <div id="idNombreErrorMsg" class="text-danger fs-4 ms-2 mt-2 d-none">El Nombre ingresado no es valido</div>
          </div>
          <div class="col-md-6">
            <label for="inputEmailUsuario" class="form-label fs-3">Email</label>
            <input type="email" class="form-control fs-3" id="inputEmailUsuario" value="${
              usuario.email
            }">
            <div id="idEmailRegistroErrorMsg" class="text-danger fs-4 ms-2 mt-2 d-none">El formato de e-mail ingresado no es válido (ej. juan@perez.com)</div>
           
          </div>
          <div class="col-md-6">
            <label for="inputPasswordUsuario" class="form-label fs-3">Contraseña</label>
            <input type="password" class="form-control fs-3" id="inputPasswordUsuario" placeholder="*******">
            <div id="idPasswordErrorMsg" class="text-danger fs-4 ms-2 mt-2 d-none">La contraseña debe contener entre 8 y 16 caracteres, al menos una minuscula, una mayuscula y un caracter especial (%@_!)</div>
          </div>
          <div class="col-12">
            <label for="inputDireccionUsuario" class="form-label fs-3">Dirección</label>
            <input type="text" class="form-control fs-3" id="inputDireccionUsuario" value="${
              usuario.direccion !== undefined ? usuario.direccion : ""
            }">
            <div id="idDireccionErrorMsg" class="text-danger fs-4 ms-2 mt-2 d-none">La dirección ingresada no es válida.</div>
          </div>
          <div class="col-md-6">
            <label for="inputCiudadUsuario" class="form-label fs-3">Ciudad</label>
            <input type="text" class="form-control fs-3" id="inputCiudadUsuario" value="${
              usuario.ciudad !== undefined ? usuario.ciudad : ""
            }">
            <div id="idCiudadErrorMsg" class="text-danger fs-4 ms-2 mt-2 d-none">La ciudad ingresada no es válida.</div>
          </div>
          <div class="col-md-4">
            <label for="inputProvinciaUsuario" class="form-label fs-3">Provincia</label>
            <input type="text" class="form-control fs-3" id="inputProvinciaUsuario" value="${
              usuario.provincia !== undefined ? usuario.provincia : ""
            }">
            <div id="idProvinciaErrorMsg" class="text-danger fs-4 ms-2 mt-2 d-none">La provincia ingresada no es válida.</div>
          </div>
          <div class="col-md-2">
            <label for="inputCPUsuario" class="form-label fs-3">CP</label>
            <input type="text" class="form-control fs-3" id="inputCPUsuario" value="${
              usuario.cp !== undefined ? usuario.cp : ""
            }">
            <div id="idCPErrorMsg" class="text-danger fs-4 ms-2 mt-2 d-none">El código postal ingresado no es válida.</div>
          </div>
          <div class="col-12">
            <label for="inputPasswordActualUsuario" class="form-label fs-4">Por razones de seguridad deberá ingresar su contraseña para modificar sus datos personales</label>
            <input type="password" class="form-control w-50 fs-3" id="inputPasswordActualUsuario">
          </div>
          <div class="col-12">
            <button type="submit" class="btn-modificar-usuario fs-2" id="idBtnModificarDatosUsuario">Modificar Datos Personales</button>
          </div>
        </form>
  `;
  const inputNombreUsuario = document.getElementById("inputNombreUsuario");
  const inputEmailUsuario = document.getElementById("inputEmailUsuario");
  const inputPasswordUsuario = document.getElementById("inputPasswordUsuario");
  const inputDireccionUsuario = document.getElementById(
    "inputDireccionUsuario"
  );
  const inputCiudadUsuario = document.getElementById("inputCiudadUsuario");
  const inputProvinciaUsuario = document.getElementById(
    "inputProvinciaUsuario"
  );
  const inputCPUsuario = document.getElementById("inputCPUsuario");
  const inputPasswordActualUsuario = document.getElementById(
    "inputPasswordActualUsuario"
  );

  const emailErrorMsg = document.getElementById("idEmailRegistroErrorMsg");
  const nombreErrorMsg = document.getElementById("idNombreErrorMsg");
  const passwordErrorMsg = document.getElementById("idPasswordErrorMsg");
  const direccionErrorMsg = document.getElementById("idDireccionErrorMsg");
  const ciudadErrorMsg = document.getElementById("idCiudadErrorMsg");
  const provinciaErrorMsg = document.getElementById("idProvinciaErrorMsg");
  const CPErrorMsg = document.getElementById("idCPErrorMsg");

  const validarFormulario = () => {
    let validated = [0, 0, 0, 0, 0, 0, 0];

    if (/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(inputNombreUsuario.value)) {
      validated[0] = 1;
      inputNombreUsuario.classList.remove("is-invalid");
      inputNombreUsuario.classList.add("is-valid");
    } else {
      nombreErrorMsg.classList.remove("d-none");
      inputNombreUsuario.classList.remove("is-valid");
      inputNombreUsuario.classList.add("is-invalid");
    }

    if (
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        inputEmailUsuario.value
      )
    ) {
      validated[1] = 1;
      inputEmailUsuario.classList.remove("is-invalid");
      inputEmailUsuario.classList.add("is-valid");
    } else {
      emailErrorMsg.classList.remove("d-none");
      inputEmailUsuario.classList.add("is-invalid");
      inputEmailUsuario.classList.remove("is-valid");
    }

    if (
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[#\!@$%]).{8,16}$/.test(
        inputPasswordUsuario.value
      ) ||
      inputPasswordUsuario.value === ""
    ) {
      validated[2] = 1;
      inputPasswordUsuario.classList.remove("is-invalid");
      inputPasswordUsuario.classList.add("is-valid");
    } else {
      passwordErrorMsg.classList.remove("d-none");
      inputPasswordUsuario.classList.add("is-invalid");
      inputPasswordUsuario.classList.remove("is-valid");
    }

    if (/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/.test(inputDireccionUsuario.value)) {
      validated[3] = 1;
      inputDireccionUsuario.classList.remove("is-invalid");
      inputDireccionUsuario.classList.add("is-valid");
    } else {
      direccionErrorMsg.classList.remove("d-none");
      inputDireccionUsuario.classList.remove("is-valid");
      inputDireccionUsuario.classList.add("is-invalid");
    }

    if (/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(inputCiudadUsuario.value)) {
      validated[4] = 1;
      inputCiudadUsuario.classList.remove("is-invalid");
      inputCiudadUsuario.classList.add("is-valid");
    } else {
      ciudadErrorMsg.classList.remove("d-none");
      inputCiudadUsuario.classList.remove("is-valid");
      inputCiudadUsuario.classList.add("is-invalid");
    }

    if (/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(inputProvinciaUsuario.value)) {
      validated[5] = 1;
      inputProvinciaUsuario.classList.remove("is-invalid");
      inputProvinciaUsuario.classList.add("is-valid");
    } else {
      provinciaErrorMsg.classList.remove("d-none");
      inputProvinciaUsuario.classList.remove("is-valid");
      inputProvinciaUsuario.classList.add("is-invalid");
    }

    if (/^[a-zA-Z0-9]+$/.test(inputCPUsuario.value)) {
      validated[6] = 1;
      inputCPUsuario.classList.remove("is-invalid");
      inputCPUsuario.classList.add("is-valid");
    } else {
      CPErrorMsg.classList.remove("d-none");
      inputCPUsuario.classList.remove("is-valid");
      inputCPUsuario.classList.add("is-invalid");
    }

    if (
      inputPasswordActualUsuario.value === usuario.password &&
      validated.reduce((a, b) => a + b, 0) === 7
    ) {
      usuarioSeleccionado = usuarios.filter(
        (usuarioDB) => usuarioDB.id === usuario.id
      );

      usuarioSeleccionado[0].nombre = inputNombreUsuario.value;
      usuarioSeleccionado[0].email = inputEmailUsuario.value;
      inputPasswordUsuario.value !== inputPasswordActualUsuario.value
        ? (usuarioSeleccionado[0].password = inputPasswordUsuario.value)
        : "";
      usuarioSeleccionado[0].direccion = inputDireccionUsuario.value;
      usuarioSeleccionado[0].ciudad = inputCiudadUsuario.value;
      usuarioSeleccionado[0].provincia = inputProvinciaUsuario.value;
      usuarioSeleccionado[0].cp = inputCPUsuario.value;

      console.log(usuarioSeleccionado);

      posicionUsuarioSeleccionado = usuarios.findIndex(
        (usuario) => usuario.id === usuarioSeleccionado.id
      );

      if (
        confirm(
          "¿Está seguro que desea modificar la información de este usuario?"
        )
      ) {
        usuarios[posicionUsuarioSeleccionado] = usuarioSeleccionado;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        location.reload();
      }
    } else {
      alert("La contraseña no es correcta.");
    }
    console.log(usuario);
  };

  const btnModificarDatosUsuario = document.getElementById(
    "idBtnModificarDatosUsuario"
  );
  btnModificarDatosUsuario.addEventListener("click", (e) => {
    e.preventDefault();
    validarFormulario();
  });
});

btnBarraLateralPedidos.addEventListener("click", () => {
  location.href = "./error404.html";
});

if (location.search.split("=")[1] === "Favoritos") {
  btnBarraLateralFavoritos.click();
} else if (location.search.split("=")[1] === "Perfil") {
  btnBarraLateralPerfil.click();
}
