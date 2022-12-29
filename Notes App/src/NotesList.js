import React from 'react'
import AddedNote from './AddedNote'

export default function NotesList({ notes, deleteNote, editNote,contains_heb }) {

  return (
    <div className='noteslist'>
      {
        notes.map((note) => (
          <AddedNote key={(note.id).toString()} title={note.title} id={note.id} text={note.text} date={note.date} modifiedDate={note.modifiedDate} editNote={editNote} deleteNote={deleteNote} contains_heb={contains_heb}/>
        ))
      }
    </div>
  )
}

