import React from 'react';
import './App.css';
import { Heading, Image, Button } from '@chakra-ui/react'
import logo from './attachments/Note Icon.png'
import NotesList from './NotesList';
import Note from './Note.js';
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from './useLocalStorage';


function App() {

  const [notes, setNotes] = useLocalStorage('note', []);

  const AddNote = (dataNote, dataTitle) => {
    const date = new Date();
    const newNote = {
      id: uuidv4(),
      title: dataTitle,
      text: dataNote,
      date: date.toLocaleString()
    }
    const newNotesList = [...notes, newNote];
    setNotes(newNotesList);
  }

  const deleteNote = (data, id) => {
    if (data) {
      const newArray = notes.filter(function (e) {
        return e.id !== id;
      });
      setNotes(newArray)
    }
  }



  const editNote = (text, title, id, onClose) => {
    const newArray = [...notes];
    const modifiedDate = new Date();
    const ind = notes.findIndex((note) => note.id === id);
    const noteToChange = newArray[ind];
    newArray[ind] = {
      title, text, id, date: noteToChange.date.toLocaleString(), modifiedDate: modifiedDate.toLocaleString()
    }
    setNotes(newArray)
    onClose()
  }

  function contains_heb(str) {
    return (/[\u0590-\u05FF]/).test(str);
  }


  return (
    <div className="App">
      <div id='header'>
        <Image src={logo} alt='logo' boxSize='45px' />
        <Heading as='h2' pt={0} pb={0} size='xl' color='black'>Notes</Heading>
        <Button id='clearAll' variant='ghost' onClick={()=>{localStorage.clear();setNotes([])}} >Clear all</Button>
      </div>

      <Note handleAddNote={AddNote} contains_heb={contains_heb} />
      <div id='addedNotes'>
        <NotesList deleteNote={deleteNote} editNote={editNote} notes={notes} contains_heb={contains_heb} />
      </div>
    </div>
  );
}

export default App;

const data = [
  
]