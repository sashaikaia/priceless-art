# Priceless Art

## Concept
This project was inspired by a visit to the the Harvard Art Museums, the art of Pablo Picasso, and is a reaction to the NFT boom of 2021. However, this priceless art is most definitely not an NFT as it is randomly generated on a server, stored in a database, and carry no ownership or exchange value.

![Untitled (The Cow Jumps Over the Moon)](https://ids.lib.harvard.edu/ids/view/22804292?width=512&height=512)

I have had an interest in procedural generation and aleatoric art for some time. Some of my early forays into programming included experiments with [Processing](https://processing.org/), a software sketchbook designed for artists, and [Tracery](https://tracery.io/), a simple tool for procedurally generation of text.

For this project, I had the idea to use p5.js (basically the JavaScript port of Processing) to create a simple procedural engine for creating abstract art from shapes and colors in the web browser. After learning about SQL in Week 7 of CS50, I knew I wanted to make a website where users could choose to submit their random work of art to a database.

## Functionality
This site runs on a Node.js and Express back end, with EJS as the templating engine. The front-end is native HTML/CSS, and the art is rendered to the canvas in JavaScript with the p5.js library.

Each time a get request is made to the index page, the server runs a function called generateArtObject which returns a JSON object called "artObject" containing all the properties needed for the procedural engine, built on p5.js, to render it to the canvas as a "painting." If the user makes a post request using the "submit" button on this page, the current artObject is written to the database, and the user is redirected to the Gallery page. When a get request is made to the gallery page, the app requests all the entries in the database, stores them in an array, and iterates over them to render/display them as art in the gallery.

## Back End - Node.js, Express, EJS
Originally, after learning Flask in Week 9, I thought I would build the back-end server for my project in Python/Flask with a front-end of HTML/CSS/JavaScript, with Jinja as the templating engine. However, as I settled on p5.js as my graphics library and realized that I felt comfortable coding in JavaScript, I thought it might make sense to keep everything in JavaScript to reduce context-switching and ease communication between the various parts of my program. Upon further research (in particular [this cs50 2022 seminar](https://www.youtube.com/live/Qao10iN0lvU?feature=share) by Nathalie Acosta '25), I realized that I could accomplish what I wanted using Node.js and Express. I chose EJS as my templating engine because the syntax was most similar to native JavaScript and HTML, and despite some frustrations in EJS' lack of templating out-of-the-box, I stuck with it.

The first part of my development process focused on building out the back end functionality. I created a very simple web app with routes for an index page and a gallery page, the ability to submit a JSON object via post request as text to a SQLite3 database, redirect to the gallery page, and iterate over the entire database, printing the results to a table in the body of the gallery.

## Front End / Graphics - HTML, CSS, Javascript, P5.js
The front end is written in native HTML/CSS. The site itself is quite simple, but I used some of EJS' features to re-use content and make the pages more dynamic.

I chose to create the procedural art engine in [P5.js](https://p5js.org/). I knew from my past experience with Processing that this library would have all the features I needed to randomly generate art from shapes, lines, objects, and colors in the web browser. The website also has a built-in editor that makes rapid-prototyping very easy. Once I had my basic back-end functionality in place, I embedded a simple prototype into the page and modified my app so that instead of writing JSON as text, it passed the object's properties into the p5 script embedded in the index page. This worked wonderfully, as I was now able to store height, width, and a set of coordinates as text in the database, then parse it back into a JavaScript object and render it as a line on the p5 canvas in the browser.

One of the first challenges I faced was when trying to render multiple database entries using p5 in the gallery page. By default, p5, can only render a single canvas. I had to completely rework my p5 prototype to run in "instanced" mode, keeping the canvas and other p5 methods out of the global namespace. This was quite difficult but very satisfying to finally get it working.

Now, I continued to develop the procedural engine to create more interesting and varied images. The main features of p5 I used are curveVertex() and vertex(), which draw curves and lines, respectivelly, between coordinates. I decided to let each painting consist of a random number of "shapes," each with a randomly assigned color, painted on top of each other. The shapes are randomly assigned a style, curved or polygonal, a color, and a number of coordinates which are used to paint the shape on the canvas.

Here I faced another challenge: when I prototyped a single shape it was a "functional" program, but in order to produce multiple shapes in a single painting (and do it from the server or the database) I needed to separate the logic of producing these properties/parameters and actually painting the shapes. I decided to refactor the prototype code into an object-oriented paradigm utilizing JavaScript "classes" to create flexible, re-usable protoypes for shapes and paintings, and I moved the code for generating an "artObject" into the main Node app. I did have some difficulty getting the p5 canvases to sit correctly in divs or respond to CSS styling, which is something I would like to work on in future development.

## Database - SQLite3, MongoDB?
I chose SQlite3 for the database simply because we used it in class, however I am in the process of successfully migrating the site's database to a MongoDB Atlas cloud database. This will be a good fit for a live version of the site because it doesn't require me to maintain a server, and because MongoDB stores documents in BSON format which can be translated directly to a JSON object. In contrast, my SQLite3 database simply stores the object as text, which can be parsed back into JSON when it is retrieved. I would also like to implement a lazy-loading pattern so the Gallery page can continue to function performatively if there are a greater number of entries in the database. Unfortunately, it is unlikely that these changes will be completed before the project is due.

![Woman in Blue](https://ids.lib.harvard.edu/ids/view/19994822?width=512&height=512)
