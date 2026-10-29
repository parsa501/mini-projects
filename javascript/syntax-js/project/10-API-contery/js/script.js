"use strict";
const resultEl=document.querySelector('.result');
(async (params) => {
  try {
    const res=await fetch('https://restcountries.com/v3.1/all')
    const data=await res.json()
    data?.map((e)=>{
      resultEl.innerHTML+=`<div class='card'>
    <img src='${e?.flags?.png}'/>
    <h2>${e?.name?.common}</h2>
    </div>`
    })
  } catch (error) {
    alert('someting wrong...')
  }
})()