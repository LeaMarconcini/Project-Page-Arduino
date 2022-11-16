
let div = document.querySelector('.left');

window.onscroll = () => {

  if (document.documentElement.scrollTop > 1) {
    document.querySelector(".navbar").classList.add("scrolled")
    div.style.height = "100vh"
  } else {
    document.querySelector(".navbar").classList.remove("scrolled");
    div.style.height = "calc(100vh - 60px)"
  }

  let img = document.querySelectorAll('.img-main')
  const firstScrollTop = 0 - document.getElementById("arduino").getBoundingClientRect().top;
  const secondScrollTop = 0 - document.getElementById("objetivo").getBoundingClientRect().top;
  if (firstScrollTop < 1) {
    img[2].style.opacity = 1

  } else if (secondScrollTop < 0) {
    img[2].style.opacity = 0
    img[1].style.opacity = 1

  } 

};

// CONTACT FORM

const regex = {
  name: /^([a-zA-Z]{3,20})( [a-zA-Z]{3,20})?$/,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  subject: /^[\s\S]{3,}$/,
  message: /^[\s\S]{3,}$/
}


// Segundo elemento de cada array es la validez
// Este objeto guarda el valor, de esta forma nos ahorramos tener que pedir el valor de cada input
// Cada vez que queramos enviarlo
let inputsValues = {
  name: ["", false],
  email: ["", false],
  subject: ["", false],
  message: ["", false]
}

let warningsInputs = document.querySelectorAll('.warning-input-valid');

const validar = (e) => {
  let inputAValidar = document.getElementById(e.target.id);
  inputsValues[e.target.id][0] = inputAValidar.value // Cambiamos el valor del input
  if (regex[e.target.id].test(inputAValidar.value)) { // Testeamos este valor contra la regex
    inputAValidar.classList.add('is-valid')
    inputAValidar.classList.remove('is-invalid')
    inputsValues[e.target.id][1] = true // Damos como true la validacion

    // Deshabilitamos el texto aviso
    e.target.nextElementSibling.classList.remove('warning-input-invalid')
  } else {
    inputAValidar.classList.add('is-invalid')
    inputsValues[e.target.id][1] = false // Damos como false la validacion

    // Mostramos el texto de aviso
    e.target.nextElementSibling.classList.add('warning-input-invalid')
  }
}


let formInputs = document.querySelectorAll('.contact-input');
// Con este bucle agregamos a todos los inputs el evento input y su validacion
for (const input of formInputs) input.addEventListener('input', validar);


const sendmail = () => {

  for (const key in inputsValues) {
    if (inputsValues[key][1] == false) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Revise los datos',
        showConfirmButton: false,
        timer: 1500
      })
      return
    }
  }

  const serviceID = "service_mv0wp8r";
  const templateID = "template_0nthrxw";

  emailjs.send(serviceID, templateID, inputsValues)
    .then(res => {

      // Una vez enviado los datos reseteamos los inputs
      for (const input of formInputs) {
        input.value = "";
        input.classList.remove("is-valid");
        input.classList.remove("is-invalid");
      }

      inputsValues = {
        name: ["", false],
        email: ["", false],
        subject: ["", false],
        message: ["", false]
      }

      console.log(res);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tu mensaje a sido enviado',
        showConfirmButton: false,
        timer: 1500
      })

    })
    .catch(err => console.log(err));
}

const progressbar = document.querySelector('.progress-bar');
const cartas = document.querySelectorAll('.cartas-progreso');
let progresoActual = 0;
let contadorCartas = 0;

const progreso = (e) => {
  if (contadorCartas < cartas.length -    1){
    cartas[contadorCartas + 1].classList.remove('carta-disabled');
  }
  cartas[contadorCartas].removeEventListener('mouseover', progreso);
  if (progresoActual <= 100) {
    progresoActual += 20;
    progressbar.style.width = `${progresoActual}%`;
    progressbar.innerHTML = `Paso ${contadorCartas + 1}`
  }
  contadorCartas++
}

for (const carta of cartas) {
  carta.addEventListener('mouseover', progreso);
}