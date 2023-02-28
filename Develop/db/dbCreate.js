// import packages
const fs = require('fs');
const util = require('util');

// uuid
const uuid = require('../helpers/uuid');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class dbCreate {
    // read method for db.json 
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }
    getNotes() {
        return this.read().then((data) => {
            // create if / else / return statement for [...data] attribute
            data = JSON.parse(data);
            if(data.length === 0){
                return [];
            } else return [...data];
        }).then(notes => notes);
    }
    // writes to db.json with note information 
    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }
    // adding new notes to the db.json
    addNote(newNote) {
        let {title, text} = newNote;
        const note = {
            title,
            text,
            id: uuid()
        };
        return this.getNotes().then((allNotes) => {
            return [...allNotes, note];
        }).then((updateNotes) => {
            return this.write( updateNotes );
        }).then(() => note);
    }
    // deletes selected note from db.json and therefor index.hmtml
    deleteNote(id) {
        return this.getNotes().then((allNotes) => {
            let newNotes = [];
            for(let i = 0; i < allNotes.length; i++)
            {
                if(allNotes[i].id != id ){
                    newNotes.push(allNotes[i]);
                };
            } return newNotes;
        }).then((endNotes) => {
            return this.write(endNotes)
        });
    };
};

module.exports = new dbCreate();