// "use strict";
// //tamrin age
// const age = 2025 - prompt("enter your brithYear");
// if (age >= 65) {
//   console.log("retirment");
// } else if (age < 65 && age >= 55) {
//   console.log("near retirment");
// } else if (age < 55 && age >= 18) {
//   console.log(`${65 - age} year to retirment`);
// } else {
//   console.log("your are junior");
// }

// // tamrin day
// const day = prompt("enter day");
// switch (day) {
//   case "sat":
//     console.log("saterday");
//     break;
//   case "sun":
//     console.log("sunday");
//     break;
//   case "mon":
//     console.log("monday");
//     break;
//   case "tus":
//     console.log("tusday");
//     break;
//   case "wed":
//     console.log("wensday");
//     break;
//   case "trs":
//     console.log("trsday");
//     break;
//   case "fri":
//     console.log("friday");
//     break;
//   default:
//     console.log("other days");
//     break;
// }

// // tamrin function fruit
// function fruitProcessor(apple, orange) {
//   const juice = `juice with ${apple * 4} apples and ${orange * 4} oranges`;
//   return juice;
// }
// const parsaOlder = fruitProcessor(prompt("apple"), prompt("orange"));
// console.log(parsaOlder);

// //tamrin function age
// function calcAge(brithYear) {
//   return 2025 - brithYear;
// }
// console.log(calcAge(prompt("enter age")));

// //tamrin زوج و فرد
// const isEven = (num) => num % 2 == 0;
// const isOod = (num) => num % 2 == 1;

// //tamrin includes
// const friends = ["parsa", "parsa1", "parsa2", "parsa3", "parsa4"];
// if (friends.includes(prompt("enter friend name"))) {
//   console.log("1");
// } else {
//   console.log("2");
// }

// //tamrin for age
// const years = [2002, 201, 2014, 19960];
// const ages = [];
// let total = 0;
// for (let i = 0; i, length; i++) {
//   total += 2025 - years[i];
//   age.push(2025 - years[i]);
// }
// let avg = total / years.length;

// // tamrin total array
// const sumArr = (arr) => {
//   let total = 0;
//   for (let i = 0; i < arr.length; i++) {
//     total += arr[i];
//   }
//   return total;
// };
// const num = [21, 65, 648, 154, 2, 0, 0, 5, 46, 9, 87, 23, 6, 9, 4, 1, 59];
// console.log(sumArr(num));

// //tamrin sprid
// const sum = (...num) => {
//   let total = 0;
//   for (let i = 0; i < num.length; i++) {
//     total += num[i];
//   }
//   return total;
// };
// console.log(sum(321, 412, 1, 5, 4, 987, 654, 3221, 6549, 874));

// //tamrin depost or move map
// const movementEuro = [-210, 130, 115, 315, -444, -80, 110];
// let totalDep = 0;
// const depositUsd = movementEuro
//   .filter((mov) => mov > 0)
//   .map((mov) => {
//     totalDep += +(mov * 1.14).toFixed(2);
//     return +(mov * 1.14).toFixed(2);
//   });
// const withdrawUsd = movementEuro
//   .filter((mov) => mov < 0)
//   .map((mov) => +(mov * 1.14).toFixed(2));
// console.log(totalDep);

// // min max
// const minMax = (type, ...num) =>
//   type == "min"
//     ? num.sort((a, b) => a - b)[0]
//     : "max"
//     ? num.sort((a, b) => b - a)[0]
//     : console.log("error");
// const newMinMax = (type, ...num) =>
//   type == "min" ? Math.min(...num) : Math.max(...num);
// console.log(minMax("max", 21, 43, 13, 53, 577, 4, -32, -42, 3, -110));

// //tamrin d  h  m
// const x = (D = 0, H = 0, M = 0) => {
//   const date = new Date();
//   date.setTime(
//     date.getTime() +
//       D * 24 * 60 * 60 * 1000 +
//       H * 60 * 60 * 1000 +
//       M * 60 * 1000
//   );
//   console.log(date.toUTCString());
// };
// x(2, undefined, 10);
