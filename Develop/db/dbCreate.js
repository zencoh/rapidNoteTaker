// define require for fs and util
const fs = require( 'fs' );
const util = require( 'util' );

// UUID
const uuid = require( '../helpers/uuid' );
const readFileAsync = util.promisify( fs.readFile );
const writeFileAsync = util.promisify( fs.writeFile );

class dbCreate {
    read() {
        return readFileAsync( 'db/db.json', 'utf8' );
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
    write(note) {
        return writeFileAsync( 'db/db.json', JSON.stringify(note) );
    }
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

module.exports = new dbCreate();