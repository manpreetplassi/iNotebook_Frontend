import NoteContext from "./noteContext"
import React, { useState } from "react"

const NoteState = (props) => {
    const host = "https://inotebookbackend2-budh.onrender.com"
    // const host = "http://localhost:5000"
    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes);
    const [displaytoggle,setDisplaytoggle] = useState("none") //state tu show pop dialogbox
    const [isLogin, setIsLogin] = useState(false) //state tu show login button


    // get notes
    const fetchNotes = async () => {
        // API call
        const url = `${host}/api/notes/fetchallnotes`
        const response = await fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        setNotes(json)
    };

    // Add notes
    const addNote = async (title, description, tag) => {

        // API call
        const url = `${host}/api/notes/addnotes`
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects

        setNotes(notes.concat(json));
        await showAlert("Your note have been Added")
    }

    // Delete notes
    const deleteNote = async (n) => {
        // API call
        const url = `${host}/api/notes/deletenotes/${n._id}`
        const response = await fetch(url, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify(n), // body data type must match "Content-Type" header
        });
        console.log(response.json());
        const updatedNotes = notes.filter((e) => e._id !== n._id);
        setNotes(updatedNotes);
        showAlert("Your note have been deleted")
    };

    // update notes
    const editNote = async ( id, title, description, tag ) => {
        // API call

        const url = `${host}/api/notes/updatenotes/${id}`
        const response = await fetch(url, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
        });
        const json = response.json();
        console.log(json);
        
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const e = newNotes[index];
            if (e._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
            setNotes(newNotes);
        }
        await showAlert("Your note have been updated")
    }

    // Alert message program
    const [textmessege, setMessege] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const showAlert = (m) => {
        setAlertVisible(true);
        setTimeout(() => {setAlertVisible(false)}, 3000);
        setMessege(m);
    }

    return (
        <NoteContext.Provider value={{ host,isLogin, setIsLogin, notes, setNotes, addNote, deleteNote, editNote, fetchNotes, displaytoggle,setDisplaytoggle, textmessege, setMessege, alertVisible, setAlertVisible, showAlert}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;

