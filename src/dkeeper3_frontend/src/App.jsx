import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import {dkeeper3_backend} from "../../declarations/dkeeper3_backend";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      dkeeper3_backend.createNote(newNote.title, newNote.content);
      return [ newNote, ...prevNotes];
    });
  }

  //useEffect is invoked everytime the screen is rendered, so the first time the screen in rendered it will be invoked
  useEffect(()=>{
    console.log('xx');
    fetchData();
  }, 
  //we are passing an empty array so that function is invoked just once i.e on page load, otherwise, fetchDAta will update notes, then setNotes will rerender the screen the useeffect will again call fetchData and it will turn into and endless loop
  []);

  async function fetchData(){
    const notesArray = await dkeeper3_backend.readNotes();
    setNotes(notesArray);
  };
  

  function deleteNote(id) {
    setNotes(prevNotes => {
      dkeeper3_backend.removeNote(id);
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
