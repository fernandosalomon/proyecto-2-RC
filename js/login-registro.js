const mainWrapper = document.getElementById("mainWrapper");
const registerBtn = document.getElementById("idBtnRegistro");
const inicioSesionBtn = document.getElementById("idBtnInicioSesion");

registerBtn.addEventListener("click", () => {
  mainWrapper.classList.add("active");
});

inicioSesionBtn.addEventListener("click", () => {
  mainWrapper.classList.remove("active");
});

