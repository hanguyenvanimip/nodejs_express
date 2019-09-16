const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.send('Wellcome to Express');
});

app.post('/', (req, res) => {
    res.send('Got a post request');
});

app.get('/example/a', (req, res) => {
    res.send('Hello from A!')
});

app.get('/example/b', (req, res, next) => {
    let i = false;
    console.log('the response will be sent by the next function ...');
    if (i)
        next();
    else
        res.send('Khong qua middleware');
}, (req, res) => {
    res.send('Hello from B');
});

var cb0 = (req, res, next) => {
    console.log('CB0');
    next();
}

var cb1 = (req, res, next) => {
    console.log('CB1');
    next();
}

app.get('/example/c', [cb0, cb1]);

app.get('/example/d', [cb0, cb1], (req, res, next) => {
    console.log('Bat dau voi middleware');
    next();
}, (req, res) => {
    console.log('Hello from D');
    res.redirect('/example/b');
});

app.route('/books')
    .get((req, res) => {
        res.send('Get a random book');
    })
    .post((req, res) => {
        res.send('Add a book');
    })
    .put((req, res) => {
        res.send('Update a book');
    });

var birds = require('./birds');

app.use('/birds', birds);

app.use('/user/:id', (req, res, next) => {
    let id= parseInt(req.params.id);
    if(id ===0)
        next('route');
    else
        next()   
},(req,res)=>{
    res.send('Regular');
});

// app.get('/user/:id', (req, res, next) => {
//     res.send('USER')
// });

app.listen(port, () => {
    console.log('Server started on: ', port);
});

