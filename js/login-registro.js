// const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const formularioRegistro = document.getElementById("formularioRegistro");

const mainWrapper = document.getElementById("mainWrapper");
const gotoRegistroBtn = document.getElementById("idgotoRegistroBtn");
const gotoInicioSesionBtn = document.getElementById("idgotoInicioSesionBtn");

gotoRegistroBtn.addEventListener("click", () => {
  mainWrapper.classList.add("active");
});

gotoInicioSesionBtn.addEventListener("click", () => {
  mainWrapper.classList.remove("active");
});

const nombreRegistro = document.getElementById("idNombreRegistro");
const emailRegistro = document.getElementById("idEmailRegistro");
const passwordRegistro = document.getElementById("idPasswordRegistro");
const repetirPasswordRegistro = document.getElementById("idRepetirPasswordRegistro");

const nombreRegistroErrorMsg = document.getElementById("idNombreRegistroErrorMsg");
const emailRegistroErrorMsg = document.getElementById("idEmailRegistroErrorMsg");
const passwordRegistroErrorMsg = document.getElementById("idPasswordRegistroErrorMsg");
const spanRequisitosPassword = document.getElementById("idPasswordRegistroErrorMsg");

const btnRegistro = document.getElementById("idBtnRegistro");

const validarNombre = (e) => {
  const input = e.target.value;
  validated = false;

  if(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(input)){
    
    nombreRegistroErrorMsg.innerText = "";
    validated = true;

  } else if(input === ""){
    nombreRegistroErrorMsg.innerText = "";
    validated = false;

  }else{
    nombreRegistroErrorMsg.innerText = "El formato del nombre no es correcto (Solo se pueden usar letras).";
    validated = false;
  }

  if(validated){
    nombreRegistro.classList.remove("is-invalid");
    nombreRegistro.classList.add("is-valid");
    nombreRegistroErrorMsg.classList.add("d-none");
  } else{
    nombreRegistro.classList.remove("is-valid");
    nombreRegistro.classList.add("is-invalid");
    nombreRegistroErrorMsg.classList.remove("d-none");
    nombreRegistroErrorMsg.classList.add("text-danger");
  }
  return validated;
};

const validarEmail = (e) => {
  const input = e.target.value;
  let validated = false;

  if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input)){

    validated = true;
  
  } else if(input === ""){
    emailRegistroErrorMsg.innerText = "";
    validated = false;
  
  } else{
    emailRegistroErrorMsg.innerText = "El formato del email no es correcto (Ej: email@dominio.com)";
    validated = false;
  }

  const usuarioExiste = usuarios.filter( (usuario) => usuario.email === e.target.value ).length;
  
  if(usuarioExiste){
    emailRegistroErrorMsg.innerText = "El email corresponde a un usuario ya registrado";
    validated = false;
  }

  if(validated){
    emailRegistro.classList.remove("is-invalid");
    emailRegistro.classList.add("is-valid");
    emailRegistroErrorMsg.classList.add("d-none");
    emailRegistroErrorMsg.classList.add("text-danger");
  }else{
    emailRegistro.classList.add("is-invalid");
    emailRegistro.classList.remove("is-valid");
    emailRegistroErrorMsg.classList.remove("d-none");
    emailRegistroErrorMsg.classList.add("text-danger");
  }

  return validated;
}

const validarPassword = (e) => {
  const input = e.target.value;
  let validated = false;

  if(input === ""){
    spanRequisitosPassword.classList.add("d-none");
  }else{
    spanRequisitosPassword.classList.remove("d-none")
    if(/^.{8,16}$/.test(input)){
      document.getElementById("pswc1").innerHTML = `<i class="bi bi-check"></i>`;
      document.getElementById("pswc1").classList.remove("marker-invalid");
      document.getElementById("pswc1").classList.add("marker-valid");
    }else{
      document.getElementById("pswc1").innerHTML = `<i class="bi bi-x"></i>`;
      document.getElementById("pswc1").classList.remove("marker-valid");
      document.getElementById("pswc1").classList.add("marker-invalid");
    }
    if(/.*[A-Z].*/.test(input)){
      document.getElementById("pswc2").innerHTML = `<i class="bi bi-check"></i>`;
      document.getElementById("pswc2").classList.remove("marker-invalid");
      document.getElementById("pswc2").classList.add("marker-valid");
    }else{
      document.getElementById("pswc2").innerHTML = `<i class="bi bi-x"></i>`;
      document.getElementById("pswc2").classList.remove("marker-valid");
      document.getElementById("pswc2").classList.add("marker-invalid");
    }
    if(/.*[a-z].*/.test(input)){
      document.getElementById("pswc3").innerHTML = `<i class="bi bi-check"></i>`;
      document.getElementById("pswc3").classList.remove("marker-invalid");
      document.getElementById("pswc3").classList.add("marker-valid");
    }else{
      document.getElementById("pswc3").innerHTML = `<i class="bi bi-x"></i>`;
      document.getElementById("pswc3").classList.remove("marker-valid");
      document.getElementById("pswc3").classList.add("marker-invalid");
    }
    if(/.*[#\!@\$%].*/.test(input)){
      document.getElementById("pswc4").innerHTML = `<i class="bi bi-check"></i>`;
      document.getElementById("pswc4").classList.remove("marker-invalid");
      document.getElementById("pswc4").classList.add("marker-valid");
    }else{
      document.getElementById("pswc4").innerHTML = `<i class="bi bi-x"></i>`;
      document.getElementById("pswc4").classList.remove("marker-valid");
      document.getElementById("pswc4").classList.add("marker-invalid");
    }
  }
  if(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[#\!@$%]).{8,16}$/.test(input)){
    validated = true;
  }else{
    validated = false;
  }

  if(validated){
    passwordRegistro.classList.remove("is-invalid");
    passwordRegistro.classList.add("is-valid");
  }else{
    passwordRegistro.classList.add("is-invalid");
    passwordRegistro.classList.remove("is-valid");
  }
  return validated;
}

const validarRepetirPassword = (e) => {
  const input = e.target.value;
  let validated = false;

  if(passwordRegistro.value === repetirPasswordRegistro.value && passwordRegistro.value !== ""){
    validated = true;
  } else{
    validated = false;
  }

  if(validated){
    repetirPasswordRegistro.classList.add("is-valid");
    repetirPasswordRegistro.classList.remove("is-invalid");
  }else{
    repetirPasswordRegistro.classList.remove("is-valid");
    repetirPasswordRegistro.classList.add("is-invalid");
  }
  return validated;
}

const validarFormulario = (e) => {
  nombreRegistro.addEventListener("input", validarNombre);
  emailRegistro.addEventListener("input", validarEmail);
  passwordRegistro.addEventListener("input", validarPassword);
  repetirPasswordRegistro.addEventListener("input", validarRepetirPassword);
  const isNombreRegistroValid = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{2,}$/.test(nombreRegistro.value);
  const isEmailRegistroValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailRegistro.value);
  const isPasswordRegistroValid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[#\!@$%]).{8,16}$/.test(passwordRegistro.value) && passwordRegistro.value === repetirPasswordRegistro.value; 

  if(isNombreRegistroValid && isEmailRegistroValid && isPasswordRegistroValid){
    btnRegistro.classList.remove("disabled");
    return true;
  } else{
    btnRegistro.classList.add("disabled");
    return false;
  }
}

nombreRegistro.addEventListener("input", validarFormulario);
emailRegistro.addEventListener("input", validarFormulario);
passwordRegistro.addEventListener("input", validarFormulario);
repetirPasswordRegistro.addEventListener("input", validarFormulario);


btnRegistro.addEventListener("click", (e) => {
  e.preventDefault();

  if(validarFormulario()){
    const usuarioExiste = usuarios.filter( (usuario) => usuario.email === e.target.value ).length;
    console.log(usuarioExiste);
    if(!usuarioExiste){
      console.log("Hola");
      if(usuarios.length){
        const nuevoUsuario = {
          id: usuarios[usuarios.length - 1].id + 1,
          nombre: nombreRegistro.value,
          email: emailRegistro.value,
          password: passwordRegistro.value,
          role: "user",
          bloqueado: false,
        };
        
        spinnerSuccessfulLogin.innerHTML = 
          `
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          `;
        spinnerSuccessfulLogin.classList.remove("d-none");
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        setTimeout(() => location.href = "./login-registro.html", 1000);
        
      }else{
        
        const nuevoUsuario = {
          id: 1,
          nombre: nombreRegistro.value,
          email: emailRegistro.value,
          password: passwordRegistro.value,
          role: "user",
          bloqueado: false,
        }
  
        spinnerSuccessfulLogin.innerHTML = 
          `
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          `;
        spinnerSuccessfulLogin.classList.remove("d-none");
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        setTimeout(() => location.href = "./login-registro.html", 1000);
      };
    }

    }else{
      alert("Algo fue mal. Comunicate con el administrador");
    };
});

const inputEmailIniciarSesion = document.getElementById("idEmailInicioSesion");
const inputPasswordIniciarSesion = document.getElementById("idPasswordInicioSesion");
const btnIniciarSesion = document.getElementById("idBtnIniciarSesion");
const errorMsgInicioSesion = document.getElementById("errorMsgInicioSesión");
const spinnerSuccessfulLogin = document.getElementById("successfulLogin");

btnIniciarSesion.addEventListener("click", (e) =>{
  e.preventDefault();
  usuarioExiste = usuarios.filter( (usuario) => 
    usuario.email === inputEmailIniciarSesion.value &&
    usuario.password === inputPasswordIniciarSesion.value
  )
  console.log(usuarioExiste);
  if(usuarioExiste.length){
    sessionStorage.setItem("usuario", JSON.stringify(usuarioExiste)) || "";
    spinnerSuccessfulLogin.innerHTML = 
      `
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      `;
      spinnerSuccessfulLogin.classList.remove("d-none");
    setTimeout(() => {
      location.href = (usuarioExiste[0].role === "administrador")? "./home-admin.html":"./productos.html";
    }, 2000);
  
  }else{
    errorMsgInicioSesion.innerHTML = "El usuario y/o contraseña no son correctos."
    errorMsgInicioSesion.classList.add("text-danger");
    errorMsgInicioSesion.classList.remove("d-none");
  }
})

