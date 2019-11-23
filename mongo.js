/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}


const password = process.argv[2]

const url =
  `mongodb+srv://derek:${password}@cluster0-legqt.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if ( process.argv.length === 3 ) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(response => {
    console.log('added ' + process.argv[3] + ' number ' + process.argv[4] + ' to the phonebook')
    mongoose.connection.close()
  })
}   else {
  console.log('incorrect number of arguments')
  mongoose.connection.close()
  process.exit(1)
}

// Note.find({}).then(result => {
//     result.forEach(note => {
//       console.log(note)
//     })
//     mongoose.connection.close()
//   })

// const note = new Note({
//   content: 'Gimme that butt girl',
//   date: new Date(),
//   important: true,
// })

// note.save().then(response => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })
