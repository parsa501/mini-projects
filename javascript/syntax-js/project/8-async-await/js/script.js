"use strict";
const commentsEl = document.querySelector(".comments");
const postEl = document.querySelector(".post");
const inpEl = document.querySelector("input");
const formEl = document.querySelector("form");
formEl.addEventListener("submit", async (e) => {
 try {
    e.preventDefault();
    const postId = inpEl.value;
    postEl.innerHTML = "";
    commentsEl.innerHTML = "";
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    const data = await res.json();
    if (data?.id) {
      postEl.innerHTML = `<div class="post-card">
              <h2>${data.title}</h2>
              <p>${data.body}</p>
          </div>`;
      const resCn = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      const dataCn = await resCn.json();
      dataCn?.map((e) => {
        commentsEl.innerHTML += `    
        <div class="comment-card">
          <h2>Name :${e.name}</h2>
          <p>Email :${e.email}</p>
          <p>Content :${e.body}</p>
        </div>`;
      });
    } else {
        throw Error(`post with id ${postId} not exist`)
    }
 } catch (error) {
    postEl.textContent = error;
 }
});

// formEl.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const postId = inpEl.value;
//     postEl.innerHTML = "";
//     commentsEl.innerHTML = "";
//     fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data?.id) {
//           postEl.innerHTML = `<div class="post-card">
//               <h2>${data.title}</h2>
//               <p>${data.body}</p>
//           </div>`;
//           fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
//             .then((resCn) => resCn.json())
//             .then((dataCn) => {
//               dataCn?.map((e) => {
//                 commentsEl.innerHTML += `
//         <div class="comment-card">
//           <h2>Name :${e.name}</h2>
//           <p>Email :${e.email}</p>
//           <p>Content :${e.body}</p>
//         </div>`;
//               });
//             });
//         } else {
//           postEl.textContent = `post with id ${postId} not exist`;
//         }
//       })
//       .catch((err) => console.log("err", err));
//   });