const mainBody = document.getElementById("idMainBody");

mainBody.innerHTML = productos
  .map(
    (producto) =>
      `
<div class="card col-12 col-md-6 col-lg-4" style="width: 32rem;">
  <img src="${producto.image}" class="card-img-top" alt="${producto.title}">
  <div class="card-body">
    <h5 class="card-title">${producto.title}</h5>
    <p class="card-text">${producto.category}</p>
    <p class="card-text">$${producto.price}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
`
  )
  .join("");
