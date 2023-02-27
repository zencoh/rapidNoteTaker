// import packages
const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3001;
// create server
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

// GET route for homepage
app.get('/', (req, res) => {
    res.json(path.join(__dirname, 'public/index.html'));
    res.sendFile(path.join(__dirname, 'public.index.html'));
});

// GET route for notes page
app.get('/notes', (req, res) => 
    res.json(path.join(__dirname, 'public/notes.html'))
);

// wildcard route to direct users to homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);
