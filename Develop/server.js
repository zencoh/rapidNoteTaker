// import packages
const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3001;
// create server
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/api', api);

// app.use(express.static('public'));

// GET route for homepage
app.get('/', (req, res) => {
    res.json(path.join(__dirname, 'public/index.html'));
    res.sendFile(path.join(__dirname, 'public.index.html'));
});

// GET route for notes page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// wildcard route to direct users to homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Get route for api notes
app.get('/api/notes', function(req, res){
    // res.json(path.join(__dirname, '/db/db.json'));    
    res.sendFile(path.join(__dirname, 'db/db.json'));
})

app.get('/api/notes', function(req, res) {
    res.json(path.join(__dirname, 'db/db.json'));
});

// Post route for api notes
app.post('/api/notes', function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    let newNote = req.body;
    let id = (savedNotes.length).toString();
    newNote.id = id;
    savedNotes.push(newNote);
    // Write to json file
    fs.writeFileSync('db/db.json', JSON.stringify(savedNotes));
    res.json(savedNotes);
});

// listener
app.listen(PORT, () => {
    console.log(`App listening on localhost:${PORT}`);
  });