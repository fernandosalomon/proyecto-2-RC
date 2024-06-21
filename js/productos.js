const mainBody = document.getElementById("idMainBody");
const mainTitle = document.getElementById("idMainTitle");
const filtroHombre = document.getElementById("filtro-genero-hombre");
const filtroMujer = document.getElementById("filtro-genero-mujer");
const filtroChildren = document.getElementById("filtro-genero-children");
const closeModalFiltro = document.querySelector(
  '[data-bs-dismiss="offcanvas"]'
);
const slider1 = document.getElementById("slider1");
const slider2 = document.getElementById("slider2");
const sliderMinPrice = document.getElementById("idSliderMinPrice");
const sliderMaxPrice = document.getElementById("idSliderMaxPrice");
const rangeTrack = document.querySelector(".range-track");
const btnRestablecerFiltros = document.getElementById(
  "idBtnRestablecerFiltros"
);
const absoluteMaxPrice = 500;

mainBody.innerHTML = productos
  .map(
    (producto) =>
      `
<div class="card col-12 col-md-6 col-lg-4 p-0 border-0 card-producto" style="width: 32rem;">
  <div class="img-container">
    <img src="${producto.image}" class="card-img-top" alt="${producto.title}">
  </div>
  <div class="card-body">
    <h5 class="card-title">${producto.title}</h5>
    <p class="card-category">${producto.category}</p>
    <p class="card-price">$${producto.price}</p>
  </div>
</div>
`
  )
  .join("");

function updateRangeTrack() {
  const min = Math.min(slider1.value, slider2.value);
  const max = Math.max(slider1.value, slider2.value);
  rangeTrack.style.left = min + "%";
  rangeTrack.style.width = max - min + "%";
  sliderMinPrice.innerHTML = `$${(min * absoluteMaxPrice) / 100}`;
  sliderMaxPrice.innerHTML = `$${(max * absoluteMaxPrice) / 100}`;
}

slider1.addEventListener("input", updateRangeTrack);
slider2.addEventListener("input", updateRangeTrack);

updateRangeTrack(); // Initial update

const filtroGenero = (productos, genero) => {
  switch (true) {
    case genero === "man":
      return productos.filter((producto) => producto.category === "man");
      break;
    case genero === "woman":
      return productos.filter((producto) => producto.category === "woman");
      break;
    case genero === "children":
      return productos.filter((producto) => producto.category === "children");
      break;
    default:
      return productos;
  }
};

const filtroPrecio = (productos, precioMin, precioMax) => {
  mainTitle.innerHTML = `${mainTitle.innerHTML} > Precios entre: $${precioMin} - $${precioMax}`;
  return productos.filter(
    (producto) =>
      Number(producto.price) > Number(precioMin) &&
      Number(producto.price) < Number(precioMax)
  );
};

const aplicarFiltros = () => {
  let listaProductosFiltrados = [...productos];

  switch (true) {
    case filtroHombre.checked:
      listaProductosFiltrados = filtroGenero(listaProductosFiltrados, "man");
      mainTitle.innerHTML = "Todos los productos > Hombre";
      break;
    case filtroMujer.checked:
      listaProductosFiltrados = filtroGenero(listaProductosFiltrados, "woman");
      mainTitle.innerHTML = "Todos los productos > Mujer";
      break;
    case filtroChildren.checked:
      listaProductosFiltrados = filtroGenero(
        listaProductosFiltrados,
        "children"
      );
      mainTitle.innerHTML = "Todos los productos > Niños";
      break;
  }

  precioMin = sliderMinPrice.innerText.split("$")[1];
  precioMax = sliderMaxPrice.innerText.split("$")[1];

  let listaProductosFiltradosPrecio = filtroPrecio(
    listaProductosFiltrados,
    precioMin,
    precioMax
  );

  mainBody.innerHTML = listaProductosFiltradosPrecio
    .map(
      (producto) =>
        `
<div class="card col-12 col-md-6 col-lg-4 p-0 border-0 card-producto" style="width: 32rem;">
  <div class="img-container">
    <img src="${producto.image}" class="card-img-top" alt="${producto.title}">
  </div>
  <div class="card-body">
    <h5 class="card-title">${producto.title}</h5>
    <p class="card-category">${producto.category}</p>
    <p class="card-price">$${producto.price}</p>
  </div>
</div>
`
    )
    .join("");
  closeModalFiltro.click();
};

const btnAplicarFiltros = document.getElementById("idBtnAplicarFiltros");
btnAplicarFiltros.addEventListener("click", aplicarFiltros);

btnRestablecerFiltros.addEventListener("click", () => {
  slider1.value = 0;
  slider2.value = 100;
  filtroHombre.checked = false;
  filtroMujer.checked = false;
  filtroChildren.checked = false;
  mainTitle.innerHTML = "Todos los productos";

  mainBody.innerHTML = productos
    .map(
      (producto) =>
        `
<div class="card col-12 col-md-6 col-lg-4 p-0 border-0 card-producto" style="width: 32rem;">
  <div class="img-container">
    <img src="${producto.image}" class="card-img-top" alt="${producto.title}">
  </div>
  <div class="card-body">
    <h5 class="card-title">${producto.title}</h5>
    <p class="card-category">${producto.category}</p>
    <p class="card-price">$${producto.price}</p>
  </div>
</div>
`
    )
    .join("");
  closeModalFiltro.click();
});
