"use strict";
const divEls = document.querySelectorAll(".scroll-anime");
const scrollFunc = () => {
  const trigger = window.innerHeight * .8;
  for (let i = 0; i <divEls.length; i++) {
    const top = divEls[i].getBoundingClientRect().top;
    if (top < trigger) {
      divEls[i].classList.add("active");
    } else if(top > trigger){
      divEls[i].classList.remove("active");
    }
  }
};
scrollFunc();
window.addEventListener("scroll", scrollFunc);
