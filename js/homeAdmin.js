const btnUsuarios = document.getElementById("idSidepanelBtnUsuarios");
const btnProductos = document.getElementById("idSidepanelBtnProductos");
const thead = document.getElementById("mainPanelThead");
const tbody = document.getElementById("mainPanelTbody");
const btnUsuariosNavbar = document.getElementById("navbarBtnUsuarios");
const btnProductosNavbar = document.getElementById("navbarBtnProductos");
const sidepanelPillProductos = document.getElementById("sidepanelPillProductos");
const sidepanelPillUsuarios = document.getElementById("sidepanelPillUsuarios");
const btnCrearProductos = document.getElementById("idBtnCrearProductosWrapper");
const modalEditarUsuario = document.getElementById("idModalEditarUsuarioBody");
const modalEditarProducto = document.getElementById("idModalEditarProductoBody");
const modalCrearProducto = document.getElementById("idModalCrearProductoBody");
const userRoles = ["usuario", "administrador"];
const productCategories = ["unisex", "man", "woman","children"];

sidepanelPillProductos.innerText = `${productos.length}`;
sidepanelPillUsuarios.innerText = `${usuarios.length}`;

const mainPanelUsuarios = () => {

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
        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#idModalEditarUsuario" onclick=editarUsuario(${usuario.id})><i class="bi bi-pencil-square"></i></button>
        <button type="button" class="btn" onclick=bloquearDesbloquearUsuario(${usuario.id})>
          ${(usuario.bloqueado)? `<i class="bi bi-person-fill"></i>` : `<i class="bi bi-person-fill-slash"></i>`}        
        </button>
        <button type="button" class="btn btn-danger" onclick=eliminarUsuario(${usuario.id})><i class="bi bi-trash"></i></button>
      </td>
    </tr>
    `
  }).join("");
}

const mainPanelProductos = () => {

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
        <div class="container">
          <div class="row">
            <button type="button" class="btn col-12 col-md-6 col-lg-3" data-bs-toggle="modal" data-bs-target="#idModalEditarProducto" onclick=editarProducto(${producto.id})>
              <i class="bi bi-pencil-square"></i>
            </button>
            <button type="button" class="btn col-12 col-md-6 col-lg-3" onclick=destacarProducto(${producto.id})>
              <i class="bi text-warning ${producto.destacado? "bi-star-fill" : "bi-star"}"></i>
            </button>
            <button type="button" class="btn col-12 col-md-6 col-lg-3" onclick=deshabilitarHabilitarProducto(${producto.id})>
              <i class="bi ${producto.bloqueado? "bi-exclamation":"bi-ban"}"></i>
            </button>
            <button type="button" class="btn btn-danger col-12 col-md-6 col-lg-3" onclick=eliminarProducto(${producto.id})>
              <i class="bi bi-trash"></i></button>
            </div>
        </div>
      </td>
    </tr>
    `
  }).join("");
}

btnUsuarios.addEventListener("click", () => location.search = '?=usuarios');

btnProductos.addEventListener("click", () => location.search = '?=productos');

btnUsuariosNavbar.addEventListener("click", () => location.search = '?=usuarios');

btnProductosNavbar.addEventListener("click", () => location.search = '?=productos');

switch(location.search.split("=")[1]){
  case "usuarios":
    mainPanelUsuarios();
    break;
  case "productos":
    mainPanelProductos();
    break;
};


// CRUD USUARIOS


const bloquearDesbloquearUsuario = (idUsuario) => {
  const posicionUsuarioSeleccionado = usuarios.findIndex((usuario) => 
    usuario.id === idUsuario
  );
  if(confirm("¿Esta seguro que desea " + (usuarios[posicionUsuarioSeleccionado].bloqueado? "desbloquear" : "bloquear") + " a este usuario?")){
    usuarios[posicionUsuarioSeleccionado].bloqueado = !usuarios[posicionUsuarioSeleccionado].bloqueado;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    location.reload();
  }
}

const eliminarUsuario = (idUsuario) => {
  if(confirm("¿Esta seguro que desea eliminar a este usuario?")){
    const newUsuarios = usuarios.filter( (usuario) => usuario.id !== idUsuario );
    localStorage.setItem("usuarios", JSON.stringify(newUsuarios));
    location.reload();
  }
}


const editarUsuario = (idUsuario) => {
  usuarioSeleccionado = usuarios.find( (usuario) => usuario.id === idUsuario);
  modalEditarUsuario.innerHTML = `
     <div class="modal-content">
            
            <div class="d-flex justify-content-end">
              <button type="button" class="btn-close m-3 fs-2" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <legend class="w-100 d-flex justify-content-center"> 
                  <img src="../img/user-icon.webp" alt="Icono de Usuario" class="w-25 mx-auto ">
                </legend>
                <div class="mb-3">
                  <label for="idUserNameEditModal" class="form-label fs-5">Nombre</label>
                  <input type="text" class="form-control fs-4" id="idUserNameEditModal">
                </div>
                <div class="mb-3">
                  <label for="idUserEmailEditModal" class="form-label fs-5">Email address</label>
                  <input type="email" class="form-control fs-4" id="idUserEmailEditModal" aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                  <label for="idSelectUserRole" class="form-label fs-5">Rol de Usuario</label>
                  <select class="form-select fs-4" aria-label="userRole" id="idSelectUserRole"></select>
                </div>
                <button type="submit" class="btn btn-primary d-block w-100 mx-auto mt-5 fs-3" id="idBtnEditUsuarioModal">Editar Usuario</button>
              </form>
            </div>
      </div>
  `
  const selectUserRole = document.getElementById("idSelectUserRole");
  selectUserRole.innerHTML = `
    ${userRoles.map((userRol) => `<option ${usuarioSeleccionado.role === userRol? "selected": ""} value=${userRoles.findIndex((ur) => ur === userRol)}>${userRol}</option>`)}
  `
  const inputNombreUsuario = document.getElementById("idUserNameEditModal");
  const inputEmailUsuario = document.getElementById("idUserEmailEditModal");

  inputNombreUsuario.value = `${usuarioSeleccionado.nombre}`;
  inputEmailUsuario.value = `${usuarioSeleccionado.email}`;

  const btnEditarUsuario = document.getElementById("idBtnEditUsuarioModal");
  btnEditarUsuario.addEventListener("click", (e) => {
    e.preventDefault();
    usuarioSeleccionado.nombre = inputNombreUsuario.value;
    usuarioSeleccionado.email = inputEmailUsuario.value;
    usuarioSeleccionado.role = selectUserRole.value;

    posicionUsuarioSeleccionado = usuarios.findIndex( (usuario) => usuario.id === usuarioSeleccionado.id);
    
    if(confirm("¿Está seguro que desea modificar la información de este usuario?")){
      usuarios[posicionUsuarioSeleccionado] = usuarioSeleccionado;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      location.reload();
    }
  });
}

// CRUD PRODUCTOS

const deshabilitarHabilitarProducto = (idProducto) => {
  const posicionProductoSeleccionado = productos.findIndex((producto) => 
    producto.id === idProducto
  );
  if(confirm("¿Esta seguro que desea " + (productos[posicionProductoSeleccionado].bloqueado? "habilitar" : "deshabilitar") + " este producto?")){
    productos[posicionProductoSeleccionado].bloqueado = !productos[posicionProductoSeleccionado].bloqueado;
    localStorage.setItem("productos", JSON.stringify(productos));
    location.reload();
  }
};

const destacarProducto = (idProducto) => {
  const posicionProductoSeleccionado = productos.findIndex((producto) => 
    producto.id === idProducto
  );

  const productosDestacados= productos.filter( (producto) => producto.destacado);
  

  if(productosDestacados.length){
   
    const posicionProductoDestacado = productos.findIndex((producto) => producto.id === productosDestacados[0].id);
    if(productosDestacados[0].id !== productos[posicionProductoSeleccionado].id){
      if(confirm("¿Esta seguro que cambiar el producto destacado?")){
        productos[posicionProductoSeleccionado].destacado = !productos[posicionProductoSeleccionado].destacado;
        productos[posicionProductoDestacado].destacado = false;
        localStorage.setItem("productos", JSON.stringify(productos));
        location.reload();
      }
    }else{
      alert("Debe haber al menos un producto destacado");
    }
    }else{
      if(confirm("¿Esta seguro que desea " + (productos[posicionProductoSeleccionado].destacado? "quitar de destacados" : "destacar") + " este producto?")){
        productos[posicionProductoSeleccionado].destacado = !productos[posicionProductoSeleccionado].destacado;
        localStorage.setItem("productos", JSON.stringify(productos));
        location.reload();
      }
    }
}

const eliminarProducto = (idProducto) => {
  if(confirm("¿Esta seguro que desea eliminar este producto?")){
    const newProductos = productos.filter( (producto) => producto.id !== idProducto );
    localStorage.setItem("productos", JSON.stringify(newProductos));
    location.reload();
  }
};

const editarProducto = (idProducto) => {
  const productoSeleccionado = productos.find((producto) => producto.id === idProducto);
  modalEditarProducto.innerHTML = `
     <div class="modal-content">
            
            <div class="d-flex justify-content-end">
              <button type="button" class="btn-close m-3 fs-2" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-header object-cover d-flex flex-column">
              <img src="${productoSeleccionado.image}" alt="${productoSeleccionado.title}" class="w-75">
            </div>
            <div class="modal-body">
                    <form>
                      <div class="container">
                        <div class="row">
                          <div class="mb-3 col-6">
                            <label for="idNombreProductoModal" class="form-label fs-5">Nombre</label>
                            <input type="text" class="form-control fs-4" id="idNombreProductoModal">
                          </div>
                          <div class="mb-3 col-6">
                              <label for="idCategoriaProductoModal" class="form-label fs-5">Categoría</label>
                              <select class="form-select fs-4" aria-label="categoriaProducto" id="idCategoriaProductoModal"></select>
                          </div>
                          <div class="mb-3 col-12">
                              <label for="idImagenProductoModal" class="form-label fs-5">Imagen</label>
                              <input type="url" class="form-control fs-4" id="idImagenProductoModal">
                          </div>
                          <div class="mb-3 col-12">
                              <label for="idDescripcionProductoModal" class="form-label fs-5">Descripción</label>
                              <textarea class="form-control" id="idDescripcionProductoModal"></textarea>
                          </div>
                          <div class="col-12 row">
                            <div class="col-6">
                              <div class="mb-3">
                                <label for="idPrecioProductoModal" class="form-label fs-5">Precio</label>
                                <div class="d-flex gap-2 aling-items-center">
                                  <p class="fs-2 m-0">$</p>
                                  <input type="text" class="form-control fs-4" id="idPrecioProductoModal">
                                </div>
                              </div>
                            </div>
                            <div class="col-6">
                              <div class="mb-3">
                                <label for="idCantidadStockProductoModal" class="form-label fs-5">Cantidad en Stock</label>
                                <input type="text" class="form-control fs-4" id="idCantidadStockProductoModal">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary d-block w-100 mx-auto mt-5 fs-3"       id="idBtnEditarProductoModal">Editar Producto</button>
                    </form>
            </div>
      </div>
  `
  const inputNombreProducto = document.getElementById("idNombreProductoModal");
  const inputImagenProducto = document.getElementById("idImagenProductoModal");
  const inputCategoriaProducto = document.getElementById("idCategoriaProductoModal");
  const inputDescripcionProducto = document.getElementById("idDescripcionProductoModal");
  const inputCantidadStockProducto = document.getElementById("idCantidadStockProductoModal");
  const inputPrecioProducto = document.getElementById("idPrecioProductoModal");

  inputCategoriaProducto.innerHTML = `
    ${productCategories.map((category) => `<option ${productoSeleccionado.category === category? "selected": ""} value=${productCategories.findIndex((cat) => cat === category)}>${category}</option>`)}
  `

  inputNombreProducto.value = productoSeleccionado.title;
  inputImagenProducto.value = productoSeleccionado.image;
  inputDescripcionProducto.value = productoSeleccionado.description;
  inputCantidadStockProducto.value = productoSeleccionado.cantidadStock;
  inputPrecioProducto.value = productoSeleccionado.price;

  const btnEditarProducto = document.getElementById("idBtnEditarProductoModal");
  btnEditarProducto.addEventListener("click", (e) => {
    e.preventDefault();
    productoSeleccionado.title = inputNombreProducto.value;
    productoSeleccionado.image = inputImagenProducto.value;
    productoSeleccionado.description = inputDescripcionProducto.value;
    productoSeleccionado.cantidadStock = inputCantidadStockProducto.value;
    productoSeleccionado.price = inputPrecioProducto.value;
    productoSeleccionado.category = inputCategoriaProducto.value;
    
    const posicionProductoSeleccionado = productos.findIndex( (producto) => producto.id === productoSeleccionado.id);
    
    if(confirm("¿Está seguro que desea modificar la información de este producto?")){
      productos[posicionProductoSeleccionado] = productoSeleccionado;
      console.log(productos);
      localStorage.setItem("productos", JSON.stringify(productos));
      location.reload();
    }
  });
}

const crearProducto = () => {
  modalCrearProducto.innerHTML = `
     <div class="modal-content">
            
            <div class="d-flex justify-content-end">
              <button type="button" class="btn-close m-3 fs-2" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-header object-cover d-flex flex-column">
              <h2 class="text-center">Agregar un nuevo producto</h2>
            </div>
            <div class="modal-body">
                    <form>
                      <div class="container">
                        <div class="row">
                          <div class="mb-3 col-6">
                            <label for="idNombreProductoModal" class="form-label fs-5">Nombre</label>
                            <input type="text" class="form-control fs-4" id="idNombreProductoModal">
                          </div>
                          <div class="mb-3 col-6">
                              <label for="idCategoriaProductoModal" class="form-label fs-5">Categoría</label>
                              <select class="form-select fs-4" aria-label="categoriaProducto" id="idCategoriaProductoModal"></select>
                          </div>
                          <div class="mb-3 col-12">
                              <label for="idImagenProductoModal" class="form-label fs-5">Imagen</label>
                              <input type="url" class="form-control fs-4" id="idImagenProductoModal">
                          </div>
                          <div class="mb-3 col-12">
                              <label for="idDescripcionProductoModal" class="form-label fs-5">Descripción</label>
                              <textarea class="form-control" id="idDescripcionProductoModal"></textarea>
                          </div>
                          <div class="col-12 row">
                            <div class="col-6">
                              <div class="mb-3">
                                <label for="idPrecioProductoModal" class="form-label fs-5">Precio</label>
                                <div class="d-flex gap-2 aling-items-center">
                                  <p class="fs-2 m-0">$</p>
                                  <input type="text" class="form-control fs-4" id="idPrecioProductoModal">
                                </div>
                              </div>
                            </div>
                            <div class="col-6">
                              <div class="mb-3">
                                <label for="idCantidadStockProductoModal" class="form-label fs-5">Cantidad en Stock</label>
                                <input type="text" class="form-control fs-4" id="idCantidadStockProductoModal">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary d-block w-100 mx-auto mt-5 fs-3"       id="idBtnEditarProductoModal">Crear Nuevo Producto</button>
                    </form>
            </div>
      </div>
  `
  const inputNombreProducto = document.getElementById("idNombreProductoModal");
  const inputImagenProducto = document.getElementById("idImagenProductoModal");
  const inputCategoriaProducto = document.getElementById("idCategoriaProductoModal");
  const inputDescripcionProducto = document.getElementById("idDescripcionProductoModal");
  const inputCantidadStockProducto = document.getElementById("idCantidadStockProductoModal");
  const inputPrecioProducto = document.getElementById("idPrecioProductoModal");

  inputCategoriaProducto.innerHTML = `
    ${productCategories.map((category) => `<option value=${productCategories.findIndex((cat) => cat === category)}>${category}</option>`)}
  `

  const btnEditarProducto = document.getElementById("idBtnEditarProductoModal");
  btnEditarProducto.addEventListener("click", (e) => {
    e.preventDefault();
    const nuevoProducto = {};
    nuevoProducto.id = productos[productos.length - 1].id + 1;
    nuevoProducto.title = inputNombreProducto.value;
    nuevoProducto.image = inputImagenProducto.value;
    nuevoProducto.description = inputDescripcionProducto.value;
    nuevoProducto.cantidadStock = inputCantidadStockProducto.value;
    nuevoProducto.price = inputPrecioProducto.value;
    nuevoProducto.category = inputCategoriaProducto.value;
    nuevoProducto.bloqueado = false;
    nuevoProducto.destacado = false;
    
    if(confirm("¿Está seguro que desea crear un nuevo producto?")){
      productos.push(nuevoProducto);
      localStorage.setItem("productos", JSON.stringify(productos));
      location.reload();
    }
  });
}

const btnCrearProducto = document.getElementById("idBtnCrearProductos");
btnCrearProducto.addEventListener("click", crearProducto); 
