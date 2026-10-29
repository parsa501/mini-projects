"use strict";
const fotmEl=document.querySelector('form')
const inputEl=document.querySelector('input')
const resultEl=document.querySelector('.result')
fotmEl.addEventListener('submit',async(e)=>{
  e.preventDefault()
  resultEl.textContent='loading...'
  try {
    const res=await fetch(`https://fakestoreapi.com/products/${inputEl.value}`)
    const data=await res.json()
    console.log(data);
    resultEl.innerHTML=`<div class='card'>
    <img src='${data.image}'/>
    <h2>${data.title.split(' ').slice(0,10).join(' ')}...</h2>
    <p>${data.description.split(' ').slice(0,10).join(' ')}....</p>
    </div>`
  } catch (error) {
resultEl.textContent='product not exist'
  }
})