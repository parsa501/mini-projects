"use strict";
const openingHours = {
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
const restaurant = {
  category: ["Italian", "Mediterranean", "European"],
  starterFood: ["Bruschetta", "Caprese Salad", "Garlic Bread"],
  mainFood: ["Spaghetti Carbonara", "Lasagna", "Margherita Pizza"],
  restaurantName: "La Trattoria",
  city: "New York",
  openingHours,
  order(startIndex, mainIndex) {
    return [this.starterFood[startIndex], this.mainFood[mainIndex]];
  },
  orderDelivery({ time = "22:00", startIndex = 0, mainIndex = 1, address }) {
    return `order is ${this.starterFood[startIndex]} and ${this.mainFood[mainIndex]} at ${time} , address : ${address}`;
  },
};


const [starterOrder, mainOrder] = restaurant.order(2, 0);
console.log(starterOrder, mainOrder);

const {
  restaurantName: resOneName,
  city: resOneCity = "mashhad",
  starterFood: resOneStarterFood,
} = restaurant;
console.log(resOneName, resOneCity, resOneStarterFood);

const {
  openingHours: {
    Fri: { open: o, close: c },
  },
} = restaurant;
console.log(o, c);

console.log(restaurant.orderDelivery({ address: "sjd Blv", time: "20:00" }));

const newMainMenu = ["pizza", ...restaurant.mainFood, "burger"];
console.log(newMainMenu);

const fullMenu = [...restaurant.starterFood, ...restaurant.mainFood];
console.log(fullMenu);

const newRes = { ...restaurant, owner: "parsa" };
console.log(newRes);
