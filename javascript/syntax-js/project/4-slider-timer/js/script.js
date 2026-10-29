"use strict";
const imgEls = document.querySelectorAll(".banner img");
const prevBtnEl = document.querySelector(".prev");
const nextBtnEl = document.querySelector(".next");
let activeIndex = 0;
const nextFunc = () => {
  clearInterval(sliderTimer);
  imgEls[activeIndex].classList.remove("active");
  activeIndex++;
  if (activeIndex == imgEls.length) {
    activeIndex = 0;
  }
  imgEls[activeIndex].classList.add("active");
  sliderTimer = setInterval(nextFunc, 4000);
};
let sliderTimer = setInterval(nextFunc, 4000);
nextBtnEl.addEventListener("click", nextFunc);
prevBtnEl.addEventListener("click", () => {
  clearInterval(sliderTimer);
  imgEls[activeIndex].classList.remove("active");
  activeIndex--;
  if (activeIndex < 0) {
    activeIndex = imgEls.length - 1;
  }
  imgEls[activeIndex].classList.add("active");
  sliderTimer = setInterval(nextFunc, 4000);
});
/////////
/////////
const timeEl = document.querySelector("time");
const startBtnEl = document.querySelector(".start");
const stopBtnEl = document.querySelector(".stop");
let clockRun = false;
let clock = setInterval(() => {
  let time = new Date();
  clockRun = true;
  timeEl.textContent = time.toLocaleTimeString();
}, 1000);
startBtnEl.addEventListener("click", () => {
  if (!clockRun) {
    clock = setInterval(() => {
      let time = new Date();
      timeEl.textContent = time.toLocaleTimeString();
      clockRun = true;
    }, 1000);
  }
});
stopBtnEl.addEventListener("click", () => {
  clearInterval(clock);
  clockRun = false;
});
