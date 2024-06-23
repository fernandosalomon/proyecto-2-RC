const userOptions = document.getElementById("userOptions");

if (usuario === "") {
  userOptions.innerHTML = `

  <button type="button" class="btn-1" id="idBtnIngresar">Ingresar</button>
  `;

  const btnIngresar = document.getElementById("idBtnIngresar");

  btnIngresar.addEventListener("click", () => {
    if (location.pathname.search("pages") === -1) {
      location.href = "./pages/login-registro.html";
    } else {
      location.href = "./login-registro.html";
    }
  });
} else {
  userOptions.innerHTML = `
  <ul class="navbar-nav">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-person-circle"></i>
      </a>
      <ul class="dropdown-menu dropend">
        <li><a class="dropdown-item" href="#">Editar Usuario</a></li>
        <hr />
        <li><a class="dropdown-item" id="idBtnCerrarSesion">Cerrar Sesión</a></li>
      </ul>
    </li>
    <li class="nav-item">
      <button class="nav-link" onclick="(() => {
        
          if (location.pathname.search('pages') === -1) {
            location.href = './pages/favoritos.html';
          } else {
            location.href = './favoritos.html';
          }
        
        })()">
        <i class="bi bi-bag"></i>
        <span class="n-elementos-favoritos" id="idElementosFavoritos"><span>
      </button>
    </li>
    <li class="nav-item">
      <button class="nav-link" onclick="(() => {
        
          if (location.pathname.search('pages') === -1) {
            location.href = './pages/carrito.html';
          } else {
            location.href = './carrito.html';
          }
        
        })()">
        <i class="bi bi-cart"></i>
        <span class="n-elementos-carrito" id="idElementosCarrito"><span>
      </button>
    </li> 
  </ul>  
  `;
  const floatingBubbleCarrito = document.getElementById("idElementosCarrito");
  const floatingBubbleFavorito = document.getElementById(
    "idElementosFavoritos"
  );

  if (usuario.carrito.length) {
    floatingBubbleCarrito.innerText = Number(usuario.carrito.length);
    floatingBubbleCarrito.classList.remove("d-none");
  } else {
    floatingBubbleCarrito.classList.add("d-none");
  }

  if (usuario.favoritos.length) {
    floatingBubbleFavorito.innerText = Number(usuario.favorito.length);
    floatingBubbleFavorito.classList.remove("d-none");
  } else {
    floatingBubbleFavorito.classList.add("d-none");
  }

  const btnCerrarSesion = document.getElementById("idBtnCerrarSesion");

  btnCerrarSesion.addEventListener("click", () => {
    sessionStorage.removeItem("usuario");
    setTimeout(() => {
      location.href = "../index.html";
    }, 1000);
  });
}
