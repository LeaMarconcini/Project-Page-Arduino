$().ready(function(){
  $('[rel="tooltip"]').tooltip({trigger:"hover"});

});

function rotateCard(btn){
  var $card = $(btn).closest('.card-container');
  console.log($card);
  if($card.hasClass('hover')){
      $card.removeClass('hover');
  } else {
      $card.addClass('hover');
  }
}

let div = document.querySelector('.left');

let img = document.querySelectorAll('.img-main')
img[1].style.opacity = 0
    img[0].style.opacity = 0
window.onscroll = () => {

  if (document.documentElement.scrollTop > 0) {
    document.querySelector(".navbar").classList.add("scrolled")
    div.style.height = "calc(100vh - 90px)"
    div.style.top = "90px";
  } else {
    document.querySelector(".navbar").classList.remove("scrolled");
    div.style.height = "calc(100vh - 126px)"
  }

  const firstScrollTop = 0 - document.getElementById("arduino").getBoundingClientRect().top;
  const secondScrollTop = 0 - document.getElementById("objetivo").getBoundingClientRect().top;
  const thirdScrollTop = 0 - document.getElementById("aQuienBeneficia").getBoundingClientRect().top;
  if (firstScrollTop < 1) {
    img[2].style.opacity = 1
    img[1].style.opacity = 0
    img[0].style.opacity = 0  
  } else if (secondScrollTop < 0) {
    img[2].style.opacity = 0
    img[1].style.opacity = 1
  } else if (thirdScrollTop < 0) {
    img[2].style.opacity = 0
    img[1].style.opacity = 0
    img[0].style.opacity = 1
  } 

};

// CONTACT FORM

const regex = {
  name: /^([a-zA-Z]{3,20})( [a-zA-Z]{3,20})?$/,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  subject: /^[\s\S]{3,}$/,
  msm: /^[\s\S]{3,}$/
}


// Segundo elemento de cada array es la validez
// Este objeto guarda el valor, de esta forma nos ahorramos tener que pedir el valor de cada input
// Cada vez que queramos enviarlo
let inputsValues = {
  name: ["", false],
  email: ["", false],
  subject: ["", false],
  msm: ["", false]
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

  let dataToSend = {}

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
    dataToSend[key] = inputsValues[key][0]
  }

  const serviceID = "service_mv0wp8r";
  const templateID = "template_0nthrxw";

  emailjs.send(serviceID, templateID, dataToSend)
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
        msm: ["", false]
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

let desarrolloBtns = document.querySelectorAll('.card-desarrollo-btn');
// let cardsDesarrollo = querySelectorAll('.card-desarrollo');

for (const btn of desarrolloBtns) {
  btn.addEventListener('click', (e) => {
    console.log(e.target.children)
  })
}