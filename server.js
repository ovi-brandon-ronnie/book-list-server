//require express
const express = require('express')
const pg = require('pg')
//create the app(instantiate)
const app = express()
//set the port
const PORT = process.env.PORT || 3000

//set the constring
const conString = 'postgres://localhost:5432/books_app'
const client = new pg.Client(conString)
client.connect()
client.on('error', error => {
    console.error(error);
})
// app.get('/test', (req, res) => res.send('hello world'))
app.get('/api/v1/books', (req, res) => {
    client.query(`SELECT * FROM books`)
    .then(function(result) {
        res.send(
            result.book_id,
            result.title,
            result.author,
            result.image_url,
        )
    })
})   
    
//listen
app.listen(PORT, () => {console.log(`Listening on port  ${PORT}`)})


