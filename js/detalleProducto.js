const id = location.search.split("=")[1];
const productosLocalStorage = JSON.parse(localStorage.getItem("productos"));
const detallesProducto = document.getElementById("detallesProducto") || [];
const productosSeleccionado = productosLocalStorage.find(
  (producto) => producto.id === Number(id)
);
console.log(productosSeleccionado);
detallesProducto.innerHTML = `  

  <section class="container mt-5 ">
        <article class="row my-5">
          <div class="col-sm-12 col-md-8 ">
            <img class="w-75 mt-5" src="${productosSeleccionado.image}" alt="" >

          </div>

          <div class="col-sm-12 col-md-4">
            <h6 class="fw-semibold fs-2">Originals</h6>
            <h3 class="fw-bolder fs-1">${productosSeleccionado.title}</h3>
            <p class="fw-semibold fs-2">$${productosSeleccionado.price}</p>
            <div class="">
            <p class="fw-semibold fs-2 text-center">Talles</p>
            <button type="button" class="btn btn-outline-dark   p-2 m-5 fs-2 w-75">35</button>
            <button type="button" class="btn btn-outline-dark  p-2 m-5 fs-2 w-75">37</button>
            <button type="button" class="btn btn-outline-dark  p-2 m-5 fs-2 w-75">40</button>
            <button type="button" class="btn btn-outline-dark  p-2 m-5 fs-2 w-75">42</button>
            </div>

            
          </div>
        </article>
        <article>
        <p class="fs-2  my-5" >${productosSeleccionado.description}</p>
        </article>
      </section>

`;
