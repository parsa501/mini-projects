"use strict";
let num = 10;
num = 20;
console.log(num);
//let قابل تغییر است
const number = 45;
console.log(number);

//const غیر قابل تغییر
const fristName = "parsa";
//fristName کمل کیس نوشتن

//string  ''  ""
const fristName1 = "parsa";
const fristName2 = "parsa";

//number
const age = 17;

//null
const haveChidern = null;

//undefined
let x;

// Boolean  true false

//clg
console.log("object");
console.log("'object'");
console.log('"object"');
console.log(5 + 5);

//typeof
console.log(typeof fristName);
console.log(typeof age);
console.log(typeof haveChidern);
console.log(typeof x);

// +  -  *  /  **
//%باقی مانده
console.log(10 + 10);
console.log(10 / 10);
console.log(10 * 10);
console.log(10 % 10);
console.log(10 ** 10);

const fName = "patsa";
const lName = "safazadeh";
console.log(fName + lName);

//-- = -1 , ++ = +1
let a;
a += 5;
a *= 2;
a /= 4;
a++;
a--;
console.log(a);

// prompt
// alert
const numOne = prompt("enter number 1");
alert("name 1");

// >   <   <=   >=
let b = 10;
let c = 20;
console.log(b > c, b < c);
console.log(b >= c, b <= c);

// ==  !=  ===  !==
let d = 10;
let e = "10";
console.log(d == e, d != e);
console.log(d === e, d !== e);

// ` ${} `
const fName1 = "parsa";
const lName1 = "safazadeh";
const job = "web dev";
const age1 = 2225 - 2008;
const information = `my name is ${fName1} ${lName1} and my job is ${job} and my age is ${age1}`;
console.log(information);

//NaN
// console.log(fName1+1);به جز بقیه NaN + , string
console.log(fName1 - 1);
console.log(fName1 * 1);
console.log(fName1 / 1);
console.log(fName1 % 1);

// Namber + string
//Namber - 'Namber'
//Namber * 'Namber'
//Namber / 'Namber'
console.log(2 + "1");
//21
console.log(2 - "1");
//1
console.log(2 * "2");
//4
console.log("10" + 1 * 2);
//102
console.log("10" + 1 - 2);
//99
console.log("10" - "10");
//0

// Namber به  string
console.log(1 + +"1");

//average  tow  person
const ageOne = +prompt("enter age person one");
const ageTwo = +prompt("enter age person two");
const average = +`${(ageOne + ageTwo) / 2}`;
console.log(average);

// if

// if (){

// }else if(){

// }else if(){

// }else{

// }
const person1 = 50;
const person2 = 100;
if (person1 >= person2) {
  console.log(1 > 2);
} else if (person2 >= person1) {
  console.log(2 > 1);
} else {
  console.log(1, 2);
}

// typeof NaN = number
console.log(typeof NaN);
console.log(typeof +"54");

//string + number = string
console.log(String(5) + 3);
console.log("5" + 3);

// parseFloat
console.log(parseFloat("3.14"));
console.log(parseFloat("1.8oink8j"));

// parseInt
console.log(parseInt("54apaokd"));

// Boolean false = null undefined '' 0 false
console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(false));

// check false or true
const money = 0;
if (money) {
  console.log("1");
} else {
  console.log("2");
}

//and = &&
console.log(true && true && true);
console.log(true && true && false);

//or = ||
console.log(false || false || true);
console.log(false || false || false);

// condition ? condition true : condition false
const money1 = 0;
if (money1) {
  console.log("1");
} else {
  console.log("2");
}
money1 ? console.log("1") : console.log("2");
const ageIf = 2025 - prompt("enter your brithYear");
if (ageIf >= 65) {
  console.log("retirment");
} else if (ageIf < 65 && ageIf >= 55) {
  console.log("near retirment");
} else if (ageIf < 55 && ageIf >= 18) {
  console.log(`${65 - ageIf} year to retirment`);
} else {
  console.log("your are junior");
}
ageIf >= 65
  ? console.log("retirment")
  : ageIf < 65 && ageIf >= 55
  ? console.log("near retirment")
  : ageIf < 55 && ageIf >= 18
  ? console.log(`${65 - ageIf} year to retirment`)
  : console.log("your are junior");

// switch
// switch(){
//     case :
//        break
//     default:
//        break
// }
const day = prompt("enter day");
switch (day) {
  case "sat":
    console.log("saterday");
    break;
  case "sun":
    console.log("sunday");
    break;
  case "mon":
    console.log("monday");
    break;
  case "tus":
    console.log("tusday");
    break;
  case "wed":
    console.log("wensday");
    break;
  case "trs":
    console.log("trsday");
    break;
  case "fri":
    console.log("friday");
    break;
  default:
    console.log("other days");
    break;
}

// function
// function name(){

// }
function logger() {
  console.log("log");
}
logger();

//  =>
const calcAge = (birthYear) => 2025 - birthYear;
console.log(calcAge(prompt("enter age")));
const isEven = (num) => num % 2 == 0;

//  Array  [] , new array
const friends = ["parsa", "parsa1", "parsa2", "parsa3", "parsa4"];
console.log(friends);
console.log(friends[1]);
console.log(friends.length);
console.log(friends[length - 1]);

// Array , new array(arrayLength:number)
const years = new Array(50);
console.log(years);
const years1 = new Array(5000, 2000, 3000);
console.log(years1);

//chang array
const friends1 = ["parsa", "parsa1", "parsa2", "parsa3", "parsa4"];
friends1[2] = "safa";
console.log(friends1);

//add element
// push
const friends2 = ["parsa", "parsa1", "parsa2", "parsa3", "parsa4"];
friends2.push("safa");
console.log(friends2);

//unshift
const friends3 = ["parsa", "parsa1", "parsa2", "parsa3", "parsa4"];
friends3.unshift("safa");

// remove Element
//pop
const friends4 = ["parsa", "parsa1", "parsa2", "parsa3", "parsa4"];
friends4.pop();
console.log(friends4);

//shift
const friends5 = ["parsa", "parsa1", "parsa2", "parsa3", "parsa4"];
friends5.shift();
console.log(friends5);

//find
// indexOf   index ,-1
const friend1 = ["parsa", "parsa1", "parsa2", "parsa3", "parsa4"];
console.log(friend1.indexOf("parsa"));
console.log(friend1.indexOf("safa"));

// inciudes  true , false
const friend2 = ["parsa", "parsa1", "parsa2", "parsa3", "parsa4"];
console.log(friend2.includes("parsa"));
console.log(friend2.includes("safa"));

// Object
const friend3 = ["parsa", "parsa1", "parsa2", "parsa3", "parsa4"];
const information1 = {
  firstName: "parsa",
  job: "web dev",
  birthYear: 2008,
  friend3,
};
console.log(information1);
console.log(information1.firstName);
console.log(information1.job);
console.log(information1.birthYear);
console.log(information1.friend3);
const personKey = "job";
console.log(information1[personKey]);
console.log(information1["first" + "Name"]);
information1.city = "mashhad";
console.log(information1);

//  this
const friend4 = ["parsa", "parsa1", "parsa2", "parsa3", "parsa4"];
const information2 = {
  firstName: "parsa",
  job: "web dev",
  birthYear: 2008,
  friend4,
  calcAge() {
    this.age = 2025 - this.birthYear;
    return this.age;
  },
};
console.log(information2.calcAge());
console.log(information2);

// حلقه
//for
for (let i = 1; i <= 10; i++) {
  console.log(`round ${i}`);
}
const friend5 = ["parsa", "parsa1", "parsa2", "parsa3", "parsa4"];
for (let i = 0; i < length; i++) {
  console.log(friend5[i]);
}

// while
// while(فقط یک شرط){

// }

// continue
// break
const num1 = [21, 65, 648, 154, 2, 0, 0, 5, 46, 9, 87, 23, 6, 9, 4, 1, 59];
for (let i = 0; i, length; i++) {
  if (num1[i] == 0) {
    break;
  } else if (num1[i] % 2 == 0) {
    console.log(num1[i]);
  }
}

// do {
// } while (condition);

//random number
let randomNum = Math.trunc(Math.random() * 6 + 1);

// document.querySelector()
// document.querySelectorAll()
const bodyEl1 = document.querySelector("body");
const bodyEl2 = document.querySelector(".body");
const bodyEl3 = document.querySelector("#body");

// addEventListener
bodyEl1.addEventListener("click", (e) => {
  console.log(e);
});
bodyEl1.addEventListener("submit", () => {});

//classList.remove
//classList.add

// setInterval  (function,milisecond)
// setTimeout   (function,milisecond)

// clearInterval()
// clearTimeout()

// new Date()
console.log(new Date());

//target.closest

//          Array Destructuring

//const []=array
const array = [300, 600, 900];
const [a1, b1, c1] = array;
console.log(a1, b1, c1);
// default
const [d1, e1 = 2, f = 1, k = 100] = array;
console.log(d1, e1, f, k);
// ferst  end
const [g, , h] = array;
console.log(g, h);
//[,,,,[],,]
const array1 = [300, 600, [100, 200], 900];
const [m, , [, n]] = array1;
console.log(m, n);

//          Object Destructuring
// const {} = Object;
const restaurant = {
  starterFood: ["Bruschetta", "Caprese Salad", "Garlic Bread"],
  restaurantName: "La Trattoria",
};
const {
  restaurantName: resOneName,
  city: resOneCity,
  starterFood: resOneStarterFood,
} = restaurant;
console.log(resOneName, resOneCity, resOneStarterFood);
// default
const {
  restaurantName: resOneName1,
  city: resOneCity1 = "mashhad",
  starterFood: resOneStarterFood1,
} = restaurant;
console.log(resOneName1, resOneCity1, resOneStarterFood1);
//{,,,{,,{,}}}
const openingHours = {
  Fri: {
    open: "08:00",
    close: "24:00",
  },
};
const {
  Fri: { open: o, close: p },
} = openingHours;
console.log(o, p);

//sperid ...
const arr1 = [21, 324, 12, 32, 4];
const numbers = [1, 4, 6, ...arr1];
console.log(...arr1);
console.log(numbers);
console.log([..."hello"]);

//sperid...   []  {}
const arr2 = [21, 42, 52, 31, 536, 44, 32, 6442, 3];
const [q, r, s, ...others] = arr2;
console.log(q, r, s, others);
const openingHours1 = {
  Fri: {
    open: "08:00",
    close: "24:00",
  },
  Sat: {
    open: "14:00",
    close: "20:00",
  },
  Sun: {
    open: "12:00",
    close: "22:00",
  },
};
const { Sat: weekend, ...otherDays } = openingHours1;
console.log(otherDays);

//nulish opretor ??
restaurant.numOfGuest ??= 10;
console.log(restaurant.numOfGuest);

//   ||
restaurant.numOfGuest ||= 10;
console.log(restaurant.numOfGuest);

//for (  of  ) array
//for(  in  ) onject

// upshnal chaining .?
restaurant?.openingHours?.Mon?.open
  ? console.log("open")
  : console.log("close");

//keys
const keys = Object.keys(restaurant);
console.log(keys);

//values
const values = Object.values(restaurant);
console.log(values);

//entries
const entries = Object.entries(restaurant);
console.log(entries);

// [{},{},{},...]
const bookings = [];
const createBook = (
  flightNum,
  numOfPassenger = 1,
  price = numOfPassenger * 199
) => {
  const booking = { flightNum, numOfPassenger, price };
  bookings.push(booking);
};
createBook(213, 3, 450);
createBook(312, 2);
createBook(431);
createBook(555, undefined, 250);
console.log(bookings);

//captal first word
// toUpperCase()
// split
// join
const upperFirstWord = (str) => {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

//captal all word
const upperFirstLetter = (str) => {
  const arrOfStr = str.split(" ");
  let newArr = [];
  for (let word of arrOfStr) {
    const [first, ...otherLetter] = [...word];
    newArr.push([first.toUpperCase(), ...otherLetter].join(""));
  }
  return newArr.join(" ");
};

// replaceAll
const slugify = (str) => str.replaceAll(" ", "-");

// تابع که ورودی یک تابع دیگه
// hiorder function
const transformStr = (str, func) => func(str);
console.log(transformStr("welcome to my website", slugify));
console.log(transformStr("welcome to my website", upperFirstLetter));
console.log(transformStr("welcome to my website", upperFirstWord));

// welcome,('')
const greet1 = (greeting) => {
  return (name) => {
    console.log(`${greeting} ${name}`);
  };
};
const greet = (greeting) => (name) => `${greeting} ${name}`;
const welcomeGreet = greet("welcome");
const hi = greet("hi");
console.log(welcomeGreet("ali"));
console.log(welcomeGreet("ahmad"));
console.log(welcomeGreet("mohammad"));
console.log(welcomeGreet("reza"));

//تابع همنجا فراخانی میشه
//(async()=>{})()

// metood
const mahanAir = {
  iataCode: "MH",
  bookings: [],
  book(flightNum, passenger) {
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, passenger });
  },
};
const book = mahanAir.book;
console.log(book);

// call
book.call(mahanAir, 555, "parsa");
console.log(mahanAir);

// apply
const reza = [444, "reza"];
book.apply(mahanAir, reza);
console.log(mahanAir);

// bind
const mahanBook = book.bind(mahanAir);
console.log(mahanBook);

const arr = ["a", "b", "c", "d", "f"];
const arrTwo = ["m", "n"];
// slice
console.log(arr.slice(1, 3));
console.log(arr.slice(1));
console.log(arr.slice(-2));
console.log(arr);

// splice
console.log(arr.splice(1, 2));
console.log(arr.splice(-2));
console.log(arr.splice(2, 1));
console.log(arr);

//reverse
console.log(arr.reverse());
console.log(arr);

//join
console.log(arr.join("-"));

//concat
const newArr = arr.concat(arrTwo);
const newArr1 = [...arr, ...arrTwo];
console.log(newArr);
console.log(newArr1);

// at Array String
console.log(arr.at(-1));
console.log("hello".at(-1));

// forEach حلقه Array
arr.forEach((letter, index) => {
  console.log(`${index}-${letter}`);
});

// filter delete Array
const movementEuro = [-210, 130, 115, 315, -444, -80, 110];
const deposit = movementEuro.filter((mov) => mov > 0);
console.log(deposit);

// map Array
const movementUsd = movementEuro.map((mov) => +(mov * 1.14).toFixed(2));
console.log(movementUsd);

// find Array
const firstDeposit = movementEuro.find((mov) => mov > 0);
console.log(firstDeposit);
const firstDeposit1 = movementEuro.filter((mov) => mov > 0)[0];
console.log(firstDeposit1);

//some
console.log(movementEuro.some((mov) => mov > 0));
console.log(movementEuro.some((mov) => mov > 1000));

//every
console.log(movementEuro.every((mov) => mov > 0));
console.log(movementEuro.every((mov) => mov > 0 || mov < 0));
let x1 = movementEuro.filter((mov) => mov > 0).length == movementEuro.length;

// flat
const z = [21, 14, [31, [31, [302], 54, 6], 67], 445, 32];
console.log(z.flat(10));
console.log(z);

// sort
const letter = ["m", "z", "a", "j", "f"];
console.log(letter.sort());
console.log(letter);
//sort number
const number1 = [21, 43, 13, 53, 577, 4, -32, -42, 3, -110];
console.log(number1.sort((a, b) => a - b));
console.log(number1.sort((a, b) => b - a));

//  isNaN
console.log(isNaN("ali"));
console.log(isNaN(0));

// sqrt
console.log(Math.sqrt(4));
console.log(8 ** (1 / 3));

//max  min
console.log(Math.max(21, 43, 13, 53, 577, 4, -32, -42, 3, -110)); //577;
console.log(Math.min(21, 43, 13, 53, 577, 4, -32, -42, 3, -110)); //-110;

// round
console.log(Math.round(25.6));
console.log(Math.round(25.3));

// floor
console.log(Math.floor(25.6));
console.log(Math.floor(25.3));

// ceil
console.log(Math.ceil(25.6));
console.log(Math.ceil(25.3));

// trunc
console.log(Math.trunc(25.6));
console.log(Math.trunc(25.3));

// new Date
const date = new Date();
//setTime plus date
console.log(date.setTime(date.getTime() + 100000));
console.log(date.toUTCString());

// API
// fetch('URL',{
// method:'GET , POST ,PUT PATCH ,DELETE '
// headers:{
// 'Content-type':'application/json'
// },
// JSON ""
// body:JSON.stringify({})
// })
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err))
  .finally(console.log("stop"));

// try {} catch (error) {}
try {
  gvbyruhfneojkcmwpdl;
} catch (error) {
  console.log(error);
}
(async (e) => {
  try {
    e.preventDefault();
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    const data = await res.json();
    if (data?.id) {
      const resCn = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      const dataCn = await resCn.json();
      dataCn?.map((e) => {});
    } else {
      throw Error(`post with id ${postId} not exist`);
    }
  } catch (error) {
    console.log(Error);
  }
})();
