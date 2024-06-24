const inputNombreContacto = document.getElementById("idInputNombre");
const inputEmailContacto = document.getElementById("idIputEmail");
const inputMsgContacto = document.getElementById("idInputMensaje");
const msgErrorContacto = document.getElementById("idMsgErrorContacto");
const btnEnviarMensajeContacto = document.getElementById("idBotonContactanos");

const validarFormularioContacto = () => {
  if (
    inputNombreContacto.value === "" ||
    inputEmailContacto.value === "" ||
    inputMsgContacto.value === ""
  ) {
    btnEnviarMensajeContacto.classList.remove("btn-enviar--disabled");
    msgErrorContacto.innerText = "Se deben rellenar todos los campos";
    msgErrorContacto.classList.remove("d-none");
  }

  if (/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(inputNombreContacto.value)) {
    inputNombreContacto.classList.remove("is-invalid");
  } else {
    btnEnviarMensajeContacto.classList.remove("btn-enviar--disabled");
    inputNombreContacto.classList.add("is-invalid");
  }

  if (
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      inputEmailContacto.value
    )
  ) {
    inputEmailContacto.classList.remove("is-invalid");
  } else {
    btnEnviarMensajeContacto.classList.remove("btn-enviar--disabled");
    inputEmailContacto.classList.add("is-invalid");
  }

  if (/^[a-zA-Z0-9\s\-;!¿¡?)($%,.]+$/.test(inputMsgContacto.value)) {
    inputMsgContacto.classList.remove("is-invalid");
  } else {
    btnEnviarMensajeContacto.classList.remove("btn-enviar--disabled");
    inputMsgContacto.classList.add("is-invalid");
  }

  if (
    /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(inputNombreContacto.value) &&
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      inputEmailContacto.value
    ) &&
    /^[a-zA-Z0-9\s\-;!¿¡?)($%,.]+$/.test(inputMsgContacto.value)
  ) {
    setTimeout(() => {
      location.href = "./error404.html";
    }, 1000);
  }
};

btnEnviarMensajeContacto.addEventListener("click", (e) => {
  e.preventDefault();
  btnEnviarMensajeContacto.classList.add("btn-enviar--disabled");
  validarFormularioContacto();
});
