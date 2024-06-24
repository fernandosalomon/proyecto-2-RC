const imgProductoDestacado = document.getElementById("idImgProductoDestacado");
const titleProductoDestacado = document.getElementById("idHeroProductTitle");
const priceProductoDestacado = document.getElementById("idHeroProductPrize");
const btnEmpezarAComprar = document.getElementById("idBtnEmpezarAComprar");
const btnComprarProductoDestacado = document.getElementById(
  "idBtnComprarProductoDestacado"
);

const productoDestacado = productos.filter(
  (producto) => producto.destacado === true
);

const productoDestacadoImgURL =
  "./" + productoDestacado[0].image.split("/").splice(1).join("/");

imgProductoDestacado.src = productoDestacadoImgURL;
imgProductoDestacado.alt = productoDestacado[0].title;
titleProductoDestacado.innerText = productoDestacado[0].title;
priceProductoDestacado.innerHTML = `$${productoDestacado[0].price}`;

btnEmpezarAComprar.addEventListener("click", () => {
  console.log("HOLA");
  if (usuario) {
    location.href = "./pages/productos.html";
  } else {
    location.href = "./pages/login-registro.html";
  }
});

btnComprarProductoDestacado.addEventListener("click", () => {
  if (usuario) {
    location.href = `./pages/detalleProducto.html?id=${productoDestacado[0].id}`;
  } else {
    location.href = "./pages/login-registro.html";
  }
});
