const mainBody = document.getElementById("idMainBody");

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
