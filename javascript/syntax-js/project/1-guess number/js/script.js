"use strict";
const formEl = document.querySelector("form");
const inputEl = document.querySelector("#guessInp");
const SubmitBtnEl = document.querySelector(".SubmitBtn");
const resetBtnEl = document.querySelector(".resetBtn");
const chanceEl = document.querySelector(".chance");
const hintEl = document.querySelector(".hint");
const guessEl = document.querySelector(".guess");
let chance = 10;
chanceEl.textContent = `chance :${chance}`;
let randomNum = Math.trunc(Math.random(0) * 100) + 1;
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  chance--;
  chanceEl.textContent = `chance :${chance}`;
  const guessNumber = +inputEl.value;
  inputEl.value = "";
  guessEl.textContent += `${guessNumber}  `;
  if (randomNum === guessNumber) {
    hintEl.textContent = `you win`;
    inputEl.disabled = true;
    SubmitBtnEl.disabled = true;
  } else {
    if (chance == 0) {
      hintEl.textContent = `you lose, random is ${randomNum}`;
      inputEl.disabled = true;
      SubmitBtnEl.disabled = true;
    } else {
      if (randomNum > guessNumber) {
        hintEl.textContent = "random num is bigger than guess number";
      } else {
        hintEl.textContent = "random num is smaller than guess number";
      }
    }
  }
});
resetBtnEl.addEventListener('click',()=>{
    chance = 5;
    chanceEl.textContent = `chance :${chance}`;
    inputEl.disabled = false;
    SubmitBtnEl.disabled = false;
    hintEl.textContent = '';
    guessEl.textContent = '';
    randomNum = Math.trunc(Math.random(0) * 100) + 1;
})
