const btnUsuarios = document.getElementById("idSidepanelBtnUsuarios");
const btnProductos = document.getElementById("idSidepanelBtnProductos");
const thead = document.getElementById("mainPanelThead");
const tbody = document.getElementById("mainPanelTbody");
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const btnUsuariosNavbar = document.getElementById("navbarBtnUsuarios");
const btnProductosNavbar = document.getElementById("navbarBtnProductos");
const sidepanelPillProductos = document.getElementById("sidepanelPillProductos");
const sidepanelPillUsuarios = document.getElementById("sidepanelPillUsuarios");
const btnCrearProductos = document.getElementById("idBtnCrearProductos");

sidepanelPillProductos.innerText = `${productos.length}`;
sidepanelPillUsuarios.innerText = `${usuarios.length}`;

btnUsuarios.addEventListener("click", () => {

  btnCrearProductos.classList.add("d-none");

  thead.innerHTML = `
    <th scope="col">ID</th>
    <th scope="col">Nombre</th>
    <th scope="col">Email</th>
    <th scope="col">Opciones</th>
  `

  tbody.innerHTML = usuarios.map( (usuario) => {
    return `
    <tr class="align-middle"> 
      <th scope="row">${usuario.id}</th>
      <td>${usuario.nombre}</td>
      <td>${usuario.email}</td>
      <td>
        <button type="button" class="btn"><i class="bi bi-pencil-square"></i></button>
        <button type="button" class="btn"><i class="bi bi-person-fill-slash"></i></button>
        <button type="button" class="btn btn-danger"><i class="bi bi-trash"></i></button>
      </td>
    </tr>
    `
  }).join("");
});


btnProductos.addEventListener("click", () => {

  btnCrearProductos.classList.remove("d-none");

  thead.innerHTML = `
    <th scope="col">ID</th>
    <th scope="col">Producto</th>
    <th scope="col">Precio</th>
    <th scope="col">Stock</th>
    <th scope="col">Opciones</th>
  `

  tbody.innerHTML = productos.map( (producto) => {
    return `
    <tr class="align-middle">
      <th scope="row">${producto.id}</th>
      <td>${producto.title}</td>
      <td>$${producto.price}</td>
      <td>0</td>
      <td>
        <button type="button" class="btn"><i class="bi bi-pencil-square"></i></button>
        <button type="button" class="btn"><i class="bi bi-star"></i></button>
        <button type="button" class="btn"><i class="bi bi-ban"></i></button>
        <button type="button" class="btn btn-danger"><i class="bi bi-trash"></i></button>
      </td>
    </tr>
    `
  }).join("");
});

btnUsuariosNavbar.addEventListener("click", (e) => {
  e.preventDefault();
  btnCrearProductos.classList.add("d-none");

  thead.innerHTML = `
    <th scope="col">ID</th>
    <th scope="col">Nombre</th>
    <th scope="col">Email</th>
    <th scope="col">Opciones</th>
  `

  tbody.innerHTML = usuarios.map( (usuario) => {
    return `
    <tr class="align-middle"> 
      <th scope="row">${usuario.id}</th>
      <td>${usuario.nombre}</td>
      <td>${usuario.email}</td>
      <td>
        <button type="button" class="btn"><i class="bi bi-pencil-square"></i></button>
        <button type="button" class="btn"><i class="bi bi-person-fill-slash"></i></button>
        <button type="button" class="btn btn-danger"><i class="bi bi-trash"></i></button>
      </td>
    </tr>
    `
  }).join("");
});

btnProductosNavbar.addEventListener("click", (e) => {
  e.preventDefault();
  btnCrearProductos.classList.remove("d-none");

  thead.innerHTML = `
    <th scope="col">ID</th>
    <th scope="col">Producto</th>
    <th scope="col">Precio</th>
    <th scope="col">Stock</th>
    <th scope="col">Opciones</th>
  `

  tbody.innerHTML = productos.map( (producto) => {
    return `
    <tr class="align-middle">
      <th scope="row">${producto.id}</th>
      <td>${producto.title}</td>
      <td>$${producto.price}</td>
      <td>0</td>
      <td>
        <button type="button" class="btn"><i class="bi bi-pencil-square"></i></button>
        <button type="button" class="btn"><i class="bi bi-star"></i></button>
        <button type="button" class="btn"><i class="bi bi-ban"></i></button>
        <button type="button" class="btn btn-danger"><i class="bi bi-trash"></i></button>
      </td>
    </tr>
    `
  }).join("");
});

