const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

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
  if(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(input)){
    nombreRegistro.classList.remove("is-invalid");
    nombreRegistro.classList.add("is-valid");

    nombreRegistroErrorMsg.innerText = "";
    nombreRegistroErrorMsg.classList.add("d-none");
    return true;
  } else if(input === ""){
    nombreRegistroErrorMsg.innerText = "";
    nombreRegistroErrorMsg.classList.add("d-none");
    nombreRegistro.classList.remove("is-invalid");
    nombreRegistro.classList.remove("is-valid");
    return false;
  }else{
    nombreRegistro.classList.remove("is-valid");
    nombreRegistro.classList.add("is-invalid");

    nombreRegistroErrorMsg.innerText = "El formato del nombre no es correcto (Solo se pueden usar letras).";
    nombreRegistroErrorMsg.classList.remove("d-none");
    nombreRegistroErrorMsg.classList.add("text-danger");
    return false;
  }
};

const validarEmail = (e) => {
  const input = e.target.value;
  if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input)){
    emailRegistro.classList.remove("is-invalid");
    emailRegistro.classList.add("is-valid");

    emailRegistroErrorMsg.innerText = "";
    emailRegistroErrorMsg.classList.add("d-none");
    return true;
  } else if(input === ""){
    emailRegistroErrorMsg.innerText = "";
    emailRegistroErrorMsg.classList.add("d-none");
    emailRegistro.classList.remove("is-invalid");
    emailRegistro.classList.remove("is-valid");
    return false;
  }else{
    emailRegistro.classList.remove("is-valid");
    emailRegistro.classList.add("is-invalid");

    emailRegistroErrorMsg.innerText = "El formato del email no es correcto (Ej: email@dominio.com)";
    emailRegistroErrorMsg.classList.remove("d-none");
    emailRegistroErrorMsg.classList.add("text-danger");
    return false;
  }
}

const validarPassword = (e) => {
  const input = e.target.value;
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
}

const validarFormulario = (e) => {
  nombreRegistro.addEventListener("input", validarNombre);
  emailRegistro.addEventListener("input", validarEmail);
  passwordRegistro.addEventListener("input", validarPassword);
  const isNombreRegistroValid = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{2,}$/.test(nombreRegistro.value);
  const isEmailRegistroValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailRegistro.value);
  const isPasswordRegistroValid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[#\!@$%]).{8,16}$/.test(passwordRegistro.value); 
  const passwordConfirm = passwordRegistro.value === repetirPasswordRegistro.value && passwordRegistro.value !== "";

  if(isNombreRegistroValid && isEmailRegistroValid && isPasswordRegistroValid && passwordConfirm){
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


btnRegistro.addEventListener("click", (e) => {
  e.preventDefault();
  if(validarFormulario()){

    const usuarioExiste = usuarios.filter( (usuario) => {
      usuario.email === nombreRegistro.value;
    }).length;

    if(usuarioExiste){

      if(usuarios.length){
        const nuevoUsuario = {
          id: usuarios[usuarios.length - 1].id + 1,
          nombre: nombreRegistro.value,
          email: emailRegistro.value,
          password: passwordRegistro.value,
          role: "user",
          bloqueado: false,
        }
  
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        location.href = "./login-registro.html";
      }else{
        const nuevoUsuario = {
          id: 1,
          nombre: nombreRegistro.value,
          email: emailRegistro.value,
          password: passwordRegistro.value,
          role: "user",
          bloqueado: false,
        }
  
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        location.href = "./login-registro.html";
      };
      
    }else{
      alert("El email ingresado ya existe");
    };

    }else{
      alert("Algo fue mal. Comunicate con el administrador");
    };
});



