const path = require('path');

module.exports = function(app){
    // GET method
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'))
    });
    // wildcard route that leads to homepage
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    });
}