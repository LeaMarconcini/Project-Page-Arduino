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