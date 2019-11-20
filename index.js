const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

const cors = require('cors')

app.use(bodyParser.json())

app.use(cors())

morgan.token ('bodyString', function getBody (req) {
    return JSON.stringify(req.body)
})

app.use(express.static('build'))

app.use(morgan(':method :url: status :res[content-length] - :response-time ms :bodyString'))



const generateId = () => {
    return Math.floor(Math.random() * Math.floor(40000));
  }

let people = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 4
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 2
    }
]

app.get('/', (req, res) => {
    res.send('<h1> Welcome to phonebook backend home page my guy </h1>')
})

app.get ('/api/persons', (req, res) => {
    res.json(people)
})

app.get('/info', (req,res) => {

    const info = 'Phonebook has info for ' + people.length  + ' people' +
    '\n\n' + new Date()

    res.send(info)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = people.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.post('/api/persons/', (req, res) => {
    const body = req.body

    const nameExists = (people.find(person => person.name.toUpperCase() === body.name.toUpperCase()))
    
    if (nameExists) {
        return res.status(400).json({
            error: 'Name is already in phonebook'
        })
    } else if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    people = people.concat(person)

    res.json(person)
})


app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    people = people.filter(person => person.id !== id)

    res.status(204).end()
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})