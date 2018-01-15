'use strict'
const express = require('express')
const pg = require('pg')
const cors = require('cors')
const bodyParser = require('body-parser').urlencoded({extended: true})

const PORT = process.env.PORT || 3000
const DATABASE_URL = 'postgres://localhost:5432/books_app'

const client = new pg.Client(DATABASE_URL)
client.connect()

const app = express()

app.use(cors())

app.get('/test', (req, res) => res.send('Hello World'))

app.get('/api/v1/books', (req, res) => {

    client.query(`
    SELECT book_id, title, author, image_url FROM books;
    `).then(result => res.send(result.rows)) 
        .catch(err => console.error(err))
})
app.get('/api/v1/books/:id', (req, res) => {
	client.query(`
	SELECT * FROM books WHERE book_id=${req.params.id};
	`).then(result => res.send(result.rows[0]))
})
app.post('/api/v1/books', express.urlencoded({extended:true}), (req, res) => {
    console.log(req.body)
	client.query(`
	INSERT INTO books 
		(title, author, image_url, isbn, description);
		VALUES($1, $2, $3, $4, $5);
	`,[
	    req.body.title,
	    req.body.author,
	    req.body.image_url,
 	    req.body.isbn,
    	req.body.description

	]).then(result => res.send('inserted successfully'))
	.catch(err => console.error(err))
}) 
app.listen(PORT, () => {console.log(`Listening on port  ${PORT}`)})


