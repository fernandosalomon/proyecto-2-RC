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
const modalEditarUsuario = document.getElementById("idModalEditarUsuarioBody");
const userRoles = ["usuario", "administrador"];

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
        <button type="button" class="btn"><i class="bi bi-pencil-square"></i></button>
        <button type="button" class="btn"><i class="bi bi-star"></i></button>
        <button type="button" class="btn"><i class="bi bi-ban"></i></button>
        <button type="button" class="btn btn-danger"><i class="bi bi-trash"></i></button>
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