"use strict";
const imgEls = document.querySelectorAll(".banner img");
const prevBtnEl = document.querySelector(".prev");
const nextBtnEl = document.querySelector(".next");
let activeIndex = 0;
nextBtnEl.addEventListener("click", () => {
  imgEls[activeIndex].classList.remove("active");
  activeIndex++;
  if (activeIndex == imgEls.length) {
    activeIndex = 0;
  }
  imgEls[activeIndex].classList.add("active");
});
prevBtnEl.addEventListener("click", () => {
  imgEls[activeIndex].classList.remove("active");
  activeIndex--;
  if (activeIndex < 0) {
    activeIndex = imgEls.length - 1;
  }
  imgEls[activeIndex].classList.add("active");
});

