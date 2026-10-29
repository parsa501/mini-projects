'use script'
const mahanAir={
  iataCode:'MH',
  bookings:[],
  book(flightNum,passenger){
    this.bookings.push({flight:`${this.iataCode}${flightNum}`,passenger})
  }
}
mahanAir.book(321,'alireza aghaee')
mahanAir.book(213,'ahmad')
console.log(mahanAir.bookings)
const book=mahanAir.book
const iranAir={
  iataCode:'IR',
  bookings:[]
}
const caspianAir={
  iataCode:'CA',
  bookings:[]
}
book.call(caspianAir,445,'alireza')
book.call(iranAir,431,'ali')
const information=[444,'reza']
book.call(caspianAir,...information)
book.apply(caspianAir,information)
console.log(iranAir.bookings)
console.log(caspianAir.bookings)

const caspianBook=book.bind(caspianAir)
const mahanBook=book.bind(mahanAir)
const iranBook=book.bind(iranAir)
caspianBook(555,'reza')
