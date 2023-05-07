// Set express as Node.js server
// install express before using with "npm install express"
const express = require('express');
const app = express();

// require sqlite3 and use the database
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./art.db');


const port = 3000;

// Allow express to read requests in JSON format
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Allow express to access static folder
app.use(express.static(__dirname + '/public'));

// Set EJS as templating engine
app.set('view engine', 'ejs');

// declare an object, ArtObject
// var artObject = {};

app.post('/submit', (req, res) => {
    console.log('post request from submit button on index page');
    console.log(artObject);
    db.run('INSERT INTO gallery(object) VALUES(?)', JSON.stringify(artObject));
    res.redirect('/gallery');
})

// post route for index page refresh button, redirect
app.post('/refresh', (req, res) => {
    console.log('post request from refresh button on index page');
    res.redirect('/');
})

// get route for index page
app.get('/', (req, res) => {
    console.log('get request for index page');

    // generate JSON object containing artwork info, re-assigning this to the artObject variable
    delete(artObject);
    var artObject = generateArtObject();
    // console.log(artObject);
    console.log(JSON.stringify(artObject));

    // render the index page
    res.render('index', {title: 'Home', artObject: JSON.stringify(artObject)})
})

// 'get' route for gallery page
app.get('/gallery', (req, res) => {
    console.log('get request for gallery page');
    // res.render('gallery', {title: 'priceless art gallery'})
    let gallery = [];
    db.each('SELECT id, object FROM gallery', (err, row) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(row);
            gallery.unshift(row.object);
        }
    }, (err) => {
        // render the gallery page
        res.render('gallery', {title: 'Gallery', gallery: gallery})
    })

})

// 'get' route for about page
app.get('/about', (req, res) => {
    console.log('get request for about page');
    // render the about page
    res.render('about', {title: 'About'})
})


app.listen(port, () => console.log('Listening on port 3000'));

// // 404 page
app.use(function(req,res){
    res.status(404).render('404');
});

// generate artObject in JSON format with width, height, background, and an array of shapes
function generateArtObject() {
    artObject = {};
    artObject.width = getRandomInt(200, 300);
    artObject.height = getRandomInt(200, 300);
    artObject.background = getRandomColor(0, 255);
    artObject.shapes = [];

    // determine the number of shapes in this artObject,
    let numOfShapes = getRandomInt(1, 5);
    // hacky way to slightly increase chance of a single shape, no chance of zero shape
    if (numOfShapes == 0) {
        numOfShapes = 1;
    }

    // for each shape
    for (let i = 0; i < numOfShapes; i++) {
        let newShape = {};
        newShape.coords = [];

        // determine the style, rounded or poly
        let styleFlip = Math.random();
        if (styleFlip < 0.5) {
            newShape.style = "rounded";
        } else {
            newShape.style = "poly";
        }

        // assign a color
        newShape.color = getRandomColor(0, 255);

        // randomize complexity aka length of coords
        let complexity = getRandomInt(2, 8) * 2;
        // push randomized coordinates to the array
        for (let j = 0; j < complexity; j++) {
            if (i % 2 == 0) {
                newShape.coords.push(getRandomInt(0, artObject.width - 1));
            } else {
                newShape.coords.push(getRandomInt(0, artObject.height - 1));
            }
        }

        // and push this shape to the artObject
        artObject.shapes.push(newShape);
    }

    return artObject;
}

// random generators

function getRandomInt(min, max) {
    // return random num between min and max, inclusive
    return min + Math.floor(Math.random() * (max - min + 1));
}

function getRandomColor(min, max) {
    if (min < 0) {
        min = 0;
    }
    if (min > 255) {
        min = 255;
    }
    if (max < 0) {
        max = 0;
    }
    if (min > 255) {
        max = 255;
    }
    let r = getRandomInt(min, max);
    let g = getRandomInt(min, max);
    let b = getRandomInt(min, max);
    let color = [r, g, b];
    return color;
}
