import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext";
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";


export default function Addnote() {

    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const addNotefnc = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
    }
    return (
        <div className='grid place-content-center'>
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Add Notes
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your details as title and description.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                        <Input size="lg" label="Title" type="text"  id="title" name='title' value={note.title} onChange={onChange} required minLength={5}/>
                        <Input size="lg" label="Description" type="text" id="description" name='description' value={note.description} onChange={onChange} required minLength={9} />
                        <Input size="lg" label="Tag" type="text" id="tag" name='tag' value={note.tag} onChange={onChange} />
                    </div>
                    <Button disabled={note.title.length<5 || note.description.length < 9} className="mt-6" fullWidth onClick={addNotefnc}>
                        Add note
                    </Button>
                </form>
            </Card>
        </div>
    )
}
