const express = require('express');
const app = express();
const PORT = 3000;


const books = [
    { 
        "id": "1",
        "title": "To Kill a Mockingbird",
        "details": [
            {
            "id": "1"
            }  
        ]
    },
    {
        "id": "2",
        "title": "1984",
        "details": [
            {
                "id": "2",
                "author": "George Orwell",
                "genre": "Dystopian",
                "publicationYear": 1949
            }
        ]
    },
    {
        "id": "3",
        "title": "Pride and Prejudice",
        "details": [
            {
                "id": "3",
                "author": "Jane Austen",
                "genre": "Romance",
                "publicationYear": 1813
            }
        ]
    },
    {
        "id": "4",
        "title": "Moby-Dick",
        "details": [
            {
                "id": "4",
                "author": "Herman Melville",
                "genre": "Adventure",
                "publicationYear": 1851
            }
        ]
    }
]
app.use(express.json());


app.get('/whoami', (req, res)=>{
    res.status(200).send({
        "studentNumber": "2693913"
    })
});

app.get('/books', (req, res)=>{
    res.status(200).send(books);
    res.status(!200).send({
        "message": "request was unsuccessful"
    });
});


app.get('/books/:id' , (req, res)=>{
    const book_id = req.params.id;
    const book = books.find(b => b.id === book_id);

    if (book){
        res.status(200).send(book);
    }
    else{
        res.status(404).send({
            "message": "request unsuccessful, book not found"
        });
    }
});



app.post('/books', (req, res) => {
    const { id, title, details } = req.body;

    if (!id || !title || !details) {
        return res.status(400).send({
            "message": "Missing required book details"
        });
    }

    if (!Array.isArray(details) || details.length === 0) {
        return res.status(400).send({
            "message": "Missing required book details"
        });
    } else {
        const newBook = {
            id: (books.length + 1).toString(),
            title,
            details
        };

        books.push(newBook);
        res.status(201).send(newBook);
    }
});



app.put('/books/:id', (req, res)=>{
    const book_id = req.params.id;
    const book = books.find(b => b.id === book_id);
    const book_idx = books.findIndex(b => b.id === book_id);

    if (book){
        books[book_idx] = {...books[book_idx], ...req.body};
        res.status(200).send(books[book_idx]);

    }
    else{
        res.status(404).send({
            "message": "request unsuccessful, book not found"
        });
    }
});

app.post('/books/:id/details', (req, res)=>{
    const book_id = req.params.id;
    const book = books.find(b => b.id === book_id);
    const book_idx = books.findIndex(b => b.id === book_id);

    if (book){
        books[book_idx].details[0] = {...books[book_idx].details[0], ...req.body};
        res.status(200).send(books[book_idx]);

    }
    else{
        res.status(404).send({
            "message": "request unsuccessful, book not found"
        });
    }
});


app.delete('/books/:id', (req, res)=>{
    const book_id = req.params.id;
    const book = books.find(b => b.id === book_id);
    const book_idx = books.findIndex(b => b.id === book_id);

    if (book){
        books.splice(book_idx, 1);
        res.status(200).send(books);

    }
    else{
        res.status(404).send({
            "message": "request unsuccessful, book not found"
        });
    }
});
app.delete('/books/:id/details/:detailId', (req, res) => {
    const book_id = req.params.id;
    const detail_id = req.params.detailId;
    const book = books.find(b => b.id === book_id);

    if (book) {
        const detailIndex = book.details.findIndex(d => d.id === detail_id);

        if (detailIndex !== -1) {
            book.details.splice(detailIndex, 1);
            res.status(200).send({
                "message": "Detail deleted successfully",
                "book": book
            });
        } else {
            res.status(404).send({
                "message": "Detail not found"
            });
        }
    } else {
        res.status(404).send({
            "message": "Book not found"
        });
    }
});

app.listen(PORT, ()=> console.log(`Listening on http://localhost:${PORT}`)); 