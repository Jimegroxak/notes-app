import fs from 'fs'
import chalk from 'chalk'

const addNote = (title, body) => 
{
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))

    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote = (title) =>
{
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length === notesToKeep.length) {
        console.log(chalk.red.inverse('No note with title \"' + title + '\" found.'))
    } else {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse("Note removed!"))
    }
}

const listNotes = () => 
{
    console.log(chalk.blue.bold('Your Notes'))
    const notes = loadNotes()

    notes.forEach(note => {
        console.log(note.title)
    })
}

const readNote = (title) =>
{
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title === title)

    if (noteToRead) {
        console.log(chalk.bold.inverse(noteToRead.title))
        console.log(noteToRead.body)
    } else {
        console.log(chalk.red.inverse('No note with title \"' + title + '\" found.'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () =>
{
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

export default {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}