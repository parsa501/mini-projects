"use strict";
const inputTextEl = document.querySelector("#inputText");
const fromLangEl = document.querySelector("#fromLang");
const toLangEl = document.querySelector("#toLang");
const translateFormEl = document.querySelector("form");
const translatedTextEl = document.querySelector("#translatedText");
(async()=>{
  try {
    const res=await fetch('https://google-translate113.p.rapidapi.com/api/v1/translator/support-languages',{
      method:'GET',
      headers:{
        'x-rapidapi-key': '793e61b096msh0180bc0bcfc492bp1a3463jsna5f724afc1c4',
        'x-rapidapi-host': 'google-translate113.p.rapidapi.com'
      }
    })
    const data=await res.json()
    data?.map((e)=>{
      fromLangEl.innerHTML+=`<option value=${e.code} >${e.language}</option>`
      toLangEl.innerHTML+=`<option value=${e.code} >${e.language}</option>`
    })
  } catch (error) {
    console.log(error)
  }
})()

translateFormEl.addEventListener('submit',async(e)=>{
e.preventDefault()
  try {
      const res=await fetch('https://google-translate113.p.rapidapi.com/api/v1/translator/text',{
        method:'POST',
        headers: {
          'x-rapidapi-key': '793e61b096msh0180bc0bcfc492bp1a3463jsna5f724afc1c4',
          'x-rapidapi-host': 'google-translate113.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          from:fromLangEl.value,
          to:toLangEl.value,
          text:inputTextEl.value
        })
      })
      const data=await res.json()
      translatedTextEl.textContent=data?.trans
  } catch (error) {
    console.log(error)
  }
})