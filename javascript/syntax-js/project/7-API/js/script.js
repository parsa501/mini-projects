"use strict";
// fetch('https://jsonplaceholder.typicode.com/posts',{
//     method:'GET',
//     headers:{
//         'Content-type':'application/json'
//     },
//     body:JSON.stringify({})
// })

// const olEl=document.querySelector('ol')
// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then((res)=>res.json())
//     .then((data)=>{
//         data?.map((e)=>{
//             olEl.innerHTML +=`<li>${e.title}</li>`
//         })
//     })
//     .catch((err)=>console.log(err))

const sectionEl=document.querySelector('.container')
fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res)=>res.json())
    .then((data)=>{
        data?.map((e)=>{
            sectionEl.innerHTML +=`<div class='card' >
            <h2>${e.title}</h2>
            <p>${e.body}</p>
            </div>`
        })
    })
    .catch((err)=>console.log(err))
