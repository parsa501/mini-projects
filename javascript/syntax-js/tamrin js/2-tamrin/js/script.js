"use strict";
// // 1
// const displayEl = document.querySelector("#display");
// const startButtonEl = document.querySelector("#startButton");
// const stopButtonEl = document.querySelector("#stopButton");
// const resetButtonEl = document.querySelector("#resetButton");
// const lapsButtonEl = document.querySelector("#lapButton");
// const lapsEl = document.querySelector("#laps");
// let timer;
// let miliSecondsRight = 0;
// let miliSecondsLeft = 0;
// let secondsRight = 0;
// let secondsLeft = 0;
// let minRight = 0;
// let minLeft = 0;
// let hourRight = 0;
// let hourLeft = 0;
// let running = false;
// let lapCounter = 1;

// const stopWatch = () => {
//   miliSecondsRight++;
//   if (miliSecondsRight > 9) {
//     miliSecondsRight = 0;
//     miliSecondsLeft++;
//     if (miliSecondsLeft > 9) {
//       miliSecondsLeft = 0;
//       secondsRight++;
//       if (secondsRight > 9) {
//         secondsRight = 0;
//         secondsLeft++;
//         if (secondsLeft > 5) {
//           secondsLeft = 0;
//           minRight++;
//           if (minRight > 9) {
//             minRight = 0;
//             minLeft++;
//             if (minLeft > 5) {
//               minLeft = 0;
//               hourRight++;
//               if (hourRight > 9) {
//                 hourRight = 0;
//                 hourLeft++;
//               }
//             }
//           }
//         }
//       }
//     }
//   }
//   displayEl.textContent = `${hourLeft}${hourRight} : ${minLeft}${minRight} : ${secondsLeft}${secondsRight} : ${miliSecondsLeft}${miliSecondsRight}`;
// };

// startButtonEl.addEventListener("click", () => {
//   if (!running) {
//     timer = setInterval(stopWatch, 10);
//     running = true;
//   }
// });

// stopButtonEl.addEventListener("click", () => {
//   if (running) {
//     clearInterval(timer);
//     running = false;
//   }
// });

// resetButtonEl.addEventListener("click", () => {
//   if (running) {
//     clearInterval(timer);
//     running = false;
//   }
//   miliSecondsRight = 0;
//   miliSecondsLeft = 0;
//   secondsRight = 0;
//   secondsLeft = 0;
//   minRight = 0;
//   minLeft = 0;
//   hourRight = 0;
//   hourLeft = 0;
//   lapCounter = 1;
//   displayEl.textContent = "00 : 00 : 00 : 00";
//   lapsEl.innerHTML = "";
// });
// lapsButtonEl.addEventListener("click", () => {
//   const lapTime = displayEl.textContent;
//   const lapItem = document.createElement("li");
//   lapItem.textContent = `laps ${lapCounter} :${lapTime} `;
//   lapsEl.appendChild(lapItem);
//   lapCounter++;
// });
// // 2
// const delay = (mlisecond) => {
//   return new Promise((resolve) => setTimeout(resolve, mlisecond));
// };
// (async (showMessage) => {
//   console.log("start");
//   await delay(2000);
//   console.log("End after 2 second");
//   alert("End after 2 second");
// })();
// // 3
// const usersDivEl = document.querySelector(".users");
// const postsDivEl = document.querySelector(".posts");
// (async () => {
//   try {
//     const [users, posts] = await Promise.all([
//       fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
//         res.json()
//       ),
//       fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
//         res.json()
//       ),
//     ]);
//     console.log("users", users);
//     console.log("postes", posts);
//     users.map((e) => {
//       usersDivEl.innerHTML += `
// <ul>
// <li>users:${e.id}</li></ul>`;
//     });
//     posts.map((e) => {
//       postsDivEl.innerHTML += `
// <ul>
// <li>posts:${e.id}</li></ul>`;
//     });
//   } catch (error) {
//     alert(error);
//   }
// })();
// // 4;
// (async () => {
//   try {
//     const response= await fetch('https://jsonplaceholder.typicode.com/invalid-url')
//     if(!response.ok)
//       throw new Error('network response was not ok')
//     const data=await response.json()
//     console.log(data);
//   } catch (error) {
//     console.log('Error',error.massag())
//   }
// })()
// 5


