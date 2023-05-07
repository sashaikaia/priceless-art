# Priceless Art
This is Priceless Art, a procedural art generator and gallery. Each time you load the home page, you will be presented with a unique digital painting created by our algorithm. If you like it, you can submit it to the gallery to add it to our permanent collection. Browse the gallery to see artwork saved by other users. \

This site was built as my final project for CS50 at Harvard Extension School in Spring of 2023. It runs on Node.js with the Express framework, using EJS as a templating engine. The paintings are generated as JSON objects on the server, stored as text in a SQLite3 database, and rendered in the client web browser by a p5.js sketch. \

## Getting Started

### Prerequisites
• Node.js v16.13.2 or higher \
Ensure that you have node installed by running:
```bash
node -v
```

• NPM v9.6.6 \
Ensure that you have npm installed by running:
```bash
npm -v
```
### Installation
Clone this GitHub repository. In your Terminal, navigate to the directory <./priceless-art> and set up node modules and dependencies by running:
```bash
npm install
```

Run the Node.js server in dev mode with:
```bash
npm run dev
```

### Running the App
You should now be able to access the app in your web browser at http://127.0.0.1:3000/ or localhost:3000.

### Usage
Each time you visit or refresh the home page, you will be greeted with a new procedurally generated digital artwork. If you like it, you can submit it to the permanent collection with the "Submit" button, which submits the currently displayed art to the Gallery database. You can generate a new artwork with the "Refresh" button or by reloading the page, but be careful! If you don't submit the current artwork you'll never be able to see it again. \

Click on "Gallery" to view the gallery, which hosts the permanent collection as stored in the art.db database. \

Click on "About" to read a little background about the project.

### Built With
JavaScript, HTML, CSS \
Node.js \
Express \
EJS \
p5.js

### Roadmap
The next planned steps for this project are:
• Migrate from sqlite3 to a MongoDB cloud database, which can read and write JSON as BSON documents in a collection. \
• Deploy the app using Render http://render.com \
• Implement lazy-loading with endless scroll on the Gallery page, so the site will continue to function performatively with a larger database. \

Other potential improvements and additions to the app could include: \
• Adding sliders to the Home Page to give users some control over the art generator's parameters. \
• Give users the ability to "sign" art with their name when submitting it to the gallery. \
• Random title generation upon submission. \
• Dedicated viewing page for each artwork.

### Contributing
Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

### Acknowledgement
Special thanks to Pablo Picasso, Willem de Kooning, and Wassily Kandinsky.

### Authors
Developed by Sasha Mandel, sashamandel@gmail.com

## License
The MIT License (MIT)

Copyright (c) 2023 Sasha Mandel

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.