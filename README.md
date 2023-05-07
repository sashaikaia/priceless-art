## Priceless Art
This is Priceless Art, a procedural art generator and gallery. Each time you load the home page, you will be presented with a unique digital painting created by our algorithm. If you like it, you can submit it to the gallery to add it to our permanent collection. Browse the gallery to see artwork saved by other users.

This site was built as my final project for CS50 at Harvard Extension School in Spring of 2023. It runs on Node.js with the Express framework, using EJS as a templating engine. The paintings are generated as JSON objects on the server, stored as text in a SQLite3 database, and rendered in the client web browser by a p5.js sketch.

## Getting Started

## Prerequisites
Node.js v19.8.1

Ensure that you have node installed by running:
```bash
node -v
```

## Installation
Download art.zip to your hard disk or codespace. Unzip the project with the terminal command:
```bash
unzip project.zip
```
Navigate to the folder 'art' with:
```bash
cd ./art
```
Install the dependencies with:
```bash
npm install express
npm install nodemon
npm install ejs
npm install sqlite3
```

Run the Node.js server in dev mode with:
```bash
npm run dev
```

## Running the App
You should now be able to access the app in your browser at http://127.0.0.1:3000/ or localhost:3000 - you can also navigate to this in VSCode by going to Ports and command-clicking on port 3000 in the list.

## Usage
Each time you visit or refresh the home page, you will be greeted with a new procedurally generated digital artwork. If you like it, you can submit it to the permanent collection with the "Submit" button, which submits the currently displayed art to the Gallery database. You can generate a new artwork with the "Refresh" button or by reloading the page, but be careful! If you don't submit the current artwork you'll never be able to see it again!

Click on "Gallery" to view the gallery, which hosts the permanent collection as stored in the art.db database.

Click on "About" to read a little background about the project.

## Built With
JavaScript, HTML, CSS
Node.js
Express
EJS
p5.js

## History, Next Steps, Contributing
This is version 1.0.0.

The next planned steps for this project are:
• Migrate from sqlite3 to a MongoDB cloud database, which can read and write JSON as BSON documents in a collection.
• Implement lazy-loading with endless scroll on the Gallery page, so the site will continue to function performatively with a larger database.
• Upload the source code to a repository on GitHub.
• Deploy the app using Render http://render.com

Possible improvements and additions to the app could include:
• Adding sliders to the Home Page to give users some control over the art generator's parameters.
• Give users the ability to "sign" art with their name when submitting it to the gallery.
• Random title generation upon submission.
• Dedicated viewing page for each artwork.

If you would like to help with this project, look for it on github soon at https://github.com/sashaikaia.

## Authors
Developed by Sasha Mandel, sashamandel@gmail.com

## License
The MIT License (MIT)

Copyright (c) 2023 Sasha Mandel

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.