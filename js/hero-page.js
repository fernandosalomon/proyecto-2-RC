const imgProductoDestacado = document.getElementById("idImgProductoDestacado");
const titleProductoDestacado = document.getElementById("idHeroProductTitle");
const priceProductoDestacado = document.getElementById("idHeroProductPrize");
// const productos = JSON.parse(localStorage.getItem("productos")) || [];

const productoDestacado = productos.filter( (producto) => producto.destacado);

const productoDestacadoImgURL = "./" + productoDestacado[0].image.split("/").splice(1).join("/");

imgProductoDestacado.src = productoDestacadoImgURL;
imgProductoDestacado.alt = productoDestacado[0].title;
titleProductoDestacado.innerText = productoDestacado[0].title;
priceProductoDestacado.innerHTML = `$${productoDestacado[0].price}`;
