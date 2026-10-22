// Set express as Node.js server
// install express before using with "npm install express"
const express = require('express');
const app = express();
// const PORT = 3000;
const PORT = process.env.PORT || 3030;

require('dotenv').config();
// console.log(process.env);

// require sqlite3 and use the database
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./art.db');

// setup MongoDB client and database
const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const db = client.db('art');


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

    // only store paintings that look like ones generateArtObject() makes
    let artObject;
    try {
        artObject = cleanArtObject(JSON.parse(req.body.myArtObject));
    } catch (err) {
        artObject = null;
    }
    if (!artObject) {
        console.log('rejected invalid art object');
        return res.status(400).send('Invalid painting');
    }

    async function submit() {
        await db.collection('gallery').insertOne(artObject);
        console.log('submitted...');
        res.redirect('/gallery');
    }
    submit().catch((err) => {
        console.dir(err);
        res.status(500).send('Could not save painting');
    });
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

    async function run() {
        try {
          let gallery = await db.collection('gallery').find({}).sort({ date: -1 }).toArray();
        //   console.log(JSON.stringify(gallery));
          res.render('gallery', {title: 'Gallery', gallery: gallery})
        } finally {
          // Ensures that the client will close when you finish/error
        //   await client.close();
        }
      }
      run().catch(console.dir);

})

// 'get' route for about page
app.get('/about', (req, res) => {
    console.log('get request for about page');
    // render the about page
    res.render('about', {title: 'About'})
})


app.listen(PORT, () => console.log('Listening on port ' + PORT));

// // 404 page
app.use(function(req,res){
    res.status(404).render('404');
});

// generate artObject in JSON format with width, height, background, and an array of shapes
function generateArtObject() {
    artObject = {};
    let x = getRandomInt(200, 300);
    artObject.width = x;
    let y = getRandomInt(200,300);
    artObject.height = y;
    artObject.background = getRandomColor(0, 255);
    artObject.shapes = [];
    artObject.date = new Date();

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
        let complexity = getRandomInt(2, 7) * 2;
        // push randomized coordinates to the array
        for (let j = 0; j < complexity; j++) {
            let newCoord;
            if (j % 2 == 0) {
                newCoord = getRandomInt(5, x-5);
                // console.log("x: " + x);
            } else {
                newCoord = getRandomInt(5, y-5);
                // console.log("y: " + y);
            }
            // console.log(newCoord);
            newShape.coords.push(newCoord);
        }

        // and push this shape to the artObject
        artObject.shapes.push(newShape);
    }

    return artObject;
}

// rebuild a submitted artObject from only the fields we expect, or return null if anything is off
function cleanArtObject(input) {
    if (!input || !isIntBetween(input.width, 200, 300) || !isIntBetween(input.height, 200, 300)) {
        return null;
    }
    if (!isColor(input.background) || !Array.isArray(input.shapes)) {
        return null;
    }
    if (input.shapes.length < 1 || input.shapes.length > 5) {
        return null;
    }

    let shapes = [];
    for (let shape of input.shapes) {
        if (!shape || !["rounded", "poly"].includes(shape.style) || !isColor(shape.color)) {
            return null;
        }
        let coords = shape.coords;
        if (!Array.isArray(coords) || coords.length < 4 || coords.length > 14 || coords.length % 2 != 0) {
            return null;
        }
        // even indexes are x coords, odd indexes are y coords, kept 5px inside the canvas
        for (let j = 0; j < coords.length; j++) {
            let max = (j % 2 == 0) ? input.width - 5 : input.height - 5;
            if (!isIntBetween(coords[j], 5, max)) {
                return null;
            }
        }
        shapes.push({ style: shape.style, color: shape.color, coords: coords });
    }

    // set the date here so clients can't pick their place in the gallery
    return {
        width: input.width,
        height: input.height,
        background: input.background,
        shapes: shapes,
        date: new Date()
    };
}

function isIntBetween(n, min, max) {
    return Number.isInteger(n) && n >= min && n <= max;
}

function isColor(color) {
    return Array.isArray(color) && color.length == 3 && color.every((c) => isIntBetween(c, 0, 255));
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
