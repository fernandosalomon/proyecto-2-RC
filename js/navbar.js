const userOptions = document.getElementById("userOptions");
// const usuario = JSON.parse(sessionStorage.getItem("usuario")) || "";

if (usuario === "") {
  userOptions.innerHTML = `

  <button type="button" class="btn-1" id="idBtnIngresar">Ingresar</button>
  `;
} else {
  userOptions.innerHTML = `
  <ul class="navbar-nav">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-person-circle"></i>
      </a>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item" href="#">Editar Usuario</a></li>
        <hr />
        <li><a class="dropdown-item" href="#" id="idBtnCerrarSesion">Cerrar Sesión</a></li>
      </ul>
    </li>
  </ul>  
  `;

}

if (usuario !== "") {
  const btnCerrarSesion = document.getElementById("idBtnCerrarSesion");

  btnCerrarSesion.addEventListener("click", () => {
    sessionStorage.removeItem("usuario");
    setTimeout(() => {
      if (location.pathname.search("pages") === -1) {
        location.href = "./index.html";
      } else {
        location.href = "../index.html";
      }
    }, 1000);
  });
}

const btnIngresar = document.getElementById("idBtnIngresar");

btnIngresar.addEventListener("click", () => {
  if (location.pathname.search("pages") === -1) {
    location.href = "./pages/login-registro.html";
  } else {
    location.href = "./login-registro.html";
  }
});

