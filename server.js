'use strict'
const express = require('express')
const pg = require('pg')
const cors = require('cors')
const bodyParser = require('body-parser').urlencoded({extended: true});

const PORT = process.env.PORT || 3000
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/books_app'

const client = new pg.Client(DATABASE_URL)
client.connect()

const app = express()

app.use(cors())

app.get('/test', (req, res) => res.send('test successful'))

app.get('/api/v1/books', (req, res) => {

    client.query(`
    SELECT book_id, title, author, image_url FROM books;
    `).then(result => res.send(result.rows)) 
        .catch(err => console.error(err))
})
    
app.listen(PORT, () => {console.log(`Listening on port  ${PORT}`)})


