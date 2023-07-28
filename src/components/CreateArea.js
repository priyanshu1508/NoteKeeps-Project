import React, { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function CreateArea() {
  const [isExpanded, setExpanded] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes().then((notes) => {
      setNotes(notes);
    });
  });

  async function getNotes() {
    const url = process.env.REACT_APP_API_URL + "/notes";
    const response = await fetch(url);
    return await response.json();
  }

  async function submitNote(ev) {
    ev.preventDefault();
    if (!title || !content) {
      alert("Note is Empty");
    } else {
      const url = process.env.REACT_APP_API_URL + "/note";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          title,
          content,
        }),
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        response.json().then((json) => {
          setTitle("");
          setContent("");
          console.log("result", json);
        });
      });
    }
  }
  function expand() {
    setExpanded(true);
  }

  async function handledelete(id) {
    const url = process.env.REACT_APP_API_URL + "/delete/" + id;
    await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        title,
        content,
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("result");
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={(ev) => setTitle(ev.target.value)}
            value={title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={(ev) => setContent(ev.target.value)}
          value={content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <button onClick={submitNote}><AddIcon/></button>
      </form>
      <div>
        {notes.length > 0 &&
          notes.map((note) => (
            <div className="note">
              <h1>{note.title}</h1>
              <p>{note.content}</p>
              <button onClick={() => handledelete(note._id)}><DeleteOutlineIcon/></button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CreateArea;
