const userOptions = document.getElementById("userOptions");
const usuario = JSON.parse(sessionStorage.getItem("usuario")) || "";
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const favorito = JSON.parse(localStorage.getItem("favorito")) || [];

if (usuario === "") {
  userOptions.innerHTML = `
  <button type="button" class="btn-1">Ingresar</button>
  `;
} else {
  userOptions.innerHTML = `
  <ul class="navbar-nav">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-person-circle"></i>
      </a>
      <ul class="dropdown-menu dropend">
        <li><a class="dropdown-item" href="#">Editar Usuario</a></li>
        <hr />
        <li><a class="dropdown-item" href="#" id="idBtnCerrarSesion">Cerrar Sesión</a></li>
      </ul>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="./favoritos.html">
        <i class="bi bi-bag"></i>
        <span class="n-elementos-favoritos" id="idElementsInFavorite"><span>
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="./carrito.html">
        <i class="bi bi-cart"></i>
        <span class="n-elementos-carrito" id="idElementsInCarrito"><span>
      </a>
    </li> 
  </ul>  
  `;
  const floatingBubbleCarrito = document.getElementById("idElementsInCarrito");
  const floatingBubbleFavorito = document.getElementById(
    "idElementsInFavorite"
  );

  if (carrito.length) {
    floatingBubbleCarrito.innerText = Number(carrito.length);
    floatingBubbleCarrito.classList.remove("d-none");
  } else {
    floatingBubbleCarrito.classList.add("d-none");
  }

  if (favorito.length) {
    floatingBubbleFavorito.innerText = Number(favorito.length);
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
