// define require for fs and util
const fs = require( 'fs' );
const util = require( 'util' );

// UUID
const uuid = require( '../helpers/uuid' );
const readFileAsync = util.promisify( fs.readFile );
const writeFileAsync = util.promisify( fs.writeFile );

// create "store" class object for parsing data into our desired locations(s) (read, write, get, add, delete)
// main "store" object should contain all other objects
// each local object should reference relevant data and include a return
class store {
    // create "read" object within "store" object
    read() {
        return readFileAsync( 'db/db.json', 'utf8' );
    }
    // create "get" object within "store" object
    getNotes() {
        return this.read().then((data) => {

            // create if / else / return statement for [...data] attribute
            data = JSON.parse(data);
            if(data.length === 0){
                return [];
            } else return [...data];
        }).then(notes => notes);
    }

    // create "write" object within "store" object
    write(note) {
        return writeFileAsync( 'db/db.json', JSON.stringify(note) );
    }
    // create "add" object within "store" object
    addNote(newNote) {
        let { title, text } = newNote;
        const note = {
            title,
            text,
            id: uuid()
        };
        return this.getNotes().then( (allNotes) => {
            return [...allNotes, note];
        }).then( ( updateNotes ) => {
            return this.write( updateNotes );
        }).then( () => note);
    }
    // create "delete" object within "store" object
    deleteNote(id) {
        return this.getNotes().then( ( allNotes ) =>         {
            let newNotes = [];
            for(let i = 0; i < allNotes.length; i++)
            {
                if(allNotes[i].id != id ){
                    newNotes.push( allNotes[i] );
                };
            } return newNotes;
        }).then( ( byeNotes ) => {
            return this.write( byeNotes )
        });
    };
};

// export module for "store"
module.exports = new store();