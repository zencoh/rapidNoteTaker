// import files
let fs = require('fs');
let util = require('util');
let store = require('../db/dbCreate.js');

module.exports = function(app) {
// GET method
app.get('/api/notes', function(req, res) {
    store.getNotes().then((data) => {
        return res.json(data);
    });
});
// POST method
app.post('/api/notes', function(req, res) {
    store.addNote(req.body).then((note) => {
        return res.json(note);
    });
});
// DELETE method
app.delete('/api/notes/:id', function(req, res){
    store.deleteNote(req.params.id).then(() => {
        return res.json({ok:true});
    });
});
}