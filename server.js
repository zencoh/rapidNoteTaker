// import packages
const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3001;
// create server
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// require routes
require( './routes/apiRoute' )(app);
require( './routes/htmlRoute' )(app);

// listen for port
app.listen(PORT, function(){
    console.log( "listening on PORT " + PORT )
});