"use strict";
const modalContainerEl = document.querySelector(".modal-container");
const closeBtnEl = document.querySelector(".modal-container button");
window.addEventListener("load", () => {
  setTimeout(() => {
    modalContainerEl.classList.add("show");
  }, 3000);
  setTimeout(() => {
    modalContainerEl.classList.remove("show");
  }, 8000);
});
closeBtnEl.addEventListener("click", () => {
  modalContainerEl.classList.remove("show");
});
modalContainerEl.addEventListener("click", (e) => {
  if (!e.target.closest(".modal")) {
    modalContainerEl.classList.remove("show");
  }
});
