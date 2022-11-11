window.onscroll = () => {
    document.documentElement.scrollTop > 1
      ? document.querySelector(".navbar").classList.add("scrolled")
      : document.querySelector(".navbar").classList.remove("scrolled");

      let div = document.querySelector('.left');
      let img = document.querySelectorAll('.img-main')
        const firstScrollTop = 0 - document.getElementById("arduino").getBoundingClientRect().top;
        const secondScrollTop = 0 - document.getElementById("objetivo").getBoundingClientRect().top;
        const thirdScrollTop = 0 - document.getElementById("desarrollo").getBoundingClientRect().top;
        if (firstScrollTop < 1) {
          img[2].style.opacity = 1
  
        } else if (secondScrollTop < 0) {
          img[2].style.opacity = 0
          img[1].style.opacity = 1
  
        } else if (thirdScrollTop < 0) {
          img[1].style.opacity = 0
          img[0].style.opacity = 1
  
        }

  };

const sendmail = () => {
  let params = {
    name : document.getElementById("name").value,
    email : document.getElementById("email").value,
    subject : document.getElementById("subject").value,
    msm : document.getElementById("message").value
  };

  for (const key in params) {
    if (params[key] == "") {
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

    emailjs.send(serviceID, templateID, params)
    .then(res=>{
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
        document.getElementById("subject").value = "";
        console.log(res);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tu mensaje a sido enviado',
          showConfirmButton: false,
          timer: 1500
        })

    })
    .catch(err=>console.log(err));
}

