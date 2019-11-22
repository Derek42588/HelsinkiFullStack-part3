require('dotenv').config({path: './.env'})

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

const cors = require('cors')
const Person = require('./models/person')

app.use(bodyParser.json())

app.use(cors())

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
  
  app.use(requestLogger)

morgan.token ('bodyString', function getBody (req) {
    return JSON.stringify(req.body)
})

app.use(express.static('build'))

app.use(morgan(':method :url: status :res[content-length] - :response-time ms :bodyString'))



// let people = [
//     {
//         name: "Arto Hellas",
//         number: "040-123456",
//         id: 1
//     },
//     {
//         name: "Ada Lovelace",
//         number: "39-44-5323523",
//         id: 4
//     },
//     {
//         name: "Dan Abramov",
//         number: "12-43-234345",
//         id: 3
//     },
//     {
//         name: "Mary Poppendieck",
//         number: "39-23-6423122",
//         id: 2
//     }
// ]

app.get('/', (req, res) => {
    res.send('<h1> Welcome to phonebook backend home page my guy </h1>')
})

app.get ('/api/persons', (req, res) => {
    Person.find({}).then(people => {
        res.json(people.map(person => person.toJSON()))
    })
})

app.get('/info', (req,res) => {

   Person.count({}, function (err, count) {
       
       const info = 'Phonebook has info for ' + count  + ' people' +
       '\n\n' + new Date()
   
       res.send(info)
   })

   
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
    .then( person => {
        if (person) {
            res.json(person.toJSON())
        } else {
            res.status(404).end()
        }
    })
    .catch(error => next(error))
})

// app.post('/api/persons/', (req, res) => {
//     const body = req.body

//     const nameExists = (people.find(person => person.name.toUpperCase() === body.name.toUpperCase()))
    
//     if (nameExists) {
//         return res.status(400).json({
//             error: 'Name is already in phonebook'
//         })
//     } else if (!body.name) {
//         return res.status(400).json({
//             error: 'name missing'
//         })
//     } else if (!body.number) {
//         return res.status(400).json({
//             error: 'number missing'
//         })
//     }

//     const person = {
//         name: body.name,
//         number: body.number,
//         id: generateId()
//     }

//     people = people.concat(person)

//     res.json(person)
// })

app.post('/api/persons/', (req,res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }

    const person = new Person ({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    })
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true } ).then(updatedPerson => {
        res.json(updatedPerson.toJSON())
    }).catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
    .then(result => {
        res.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)
  
  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    }
  
    next(error)
  }
  
  app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})