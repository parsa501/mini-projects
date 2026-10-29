'use script'
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
  const restaurant = {
    category: ["Italian", "Mediterranean", "European"],
    starterFood: ["Bruschetta", "Caprese Salad", "Garlic Bread"],
    mainFood: ["Spaghetti Carbonara", "Lasagna", "Margherita Pizza"],
    restaurantName: "La Trattoria",
    city: "New York",
    order(startIndex, mainIndex) {
      return [this.starterFood[startIndex], this.mainFood[mainIndex]];
    },
    orderDelivery({ time = "22:00", startIndex = 0, mainIndex = 1, address }) {
      return `order is ${this.starterFood[startIndex]} and ${this.mainFood[mainIndex]} at ${time} , address : ${address}`;
    },
  };

restaurant.numOfGuest=0
// restaurant.numOfGuest = restaurant.numOfGuest || 10 
// restaurant.numOfGuest = restaurant.numOfGuest ?? 10
restaurant.numOfGuest??= 10
restaurant.numOfGuest||= 10
console.log(restaurant.numOfGuest)

const fullMenu=[...restaurant.starterFood,...restaurant.mainFood]
console.log(fullMenu)
for(let item of fullMenu){
    console.log(item)
}
for(let item in restaurant){
    console.log(item)
}
if(restaurant.openingHours && restaurant.openingHours.Mon){
}else{
    console.log('restaurant closed')
}
console.log(restaurant?.openingHours?.Mon?.open?.close?.x)
restaurant?.openingHours?.Mon?.open ? console.log('open') :console.log('close')
const entries=Object.entries(restaurant)
console.log(entries)
for(let [key,value] of entries){
   if(typeof value=="string"){
    console.log(`${key}:${value}`)
   }
}

const flightNumber=231
const information={
    name:'parsa',
    passport:765438765432
}
const change=(flight,passenger)=>{
    flight=444
    passenger.name='Mr '+passenger.name
}
change(flightNumber,information)
console.log(flightNumber,information)

const changePassportNumber=(person)=>{
    person.passenger=Math.trunc(Math.random()*10**10)
}



