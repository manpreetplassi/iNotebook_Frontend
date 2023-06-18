import React, { useContext, useEffect, useState } from 'react'
import noteContext from "../context/notes/noteContext";
import Noteitem from './Noteitem';

import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";


export default function Notes() {
    const context = useContext(noteContext);
    const { notes, fetchNotes, editNote,displaytoggle,setDisplaytoggle } = context;
    useEffect(() => {
        fetchNotes();
        // eslint-disable-next-line 
    }, [])
    const onClose = (e) => {
        if (e.target.id === 'container') { setDisplaytoggle("none") }
    }
    
    
    const [enote, setNote] = useState({id:"", title: "", description: "", tag: "" })

    const getDataFromClick = (n) => {
        setNote({id:n._id, title:n.title, description:n.description, tag:n.tag});
    };

    const onChange = (e) => {
        setNote({ ...enote, [e.target.name]: e.target.value })
    }
    const updateNotefnc = async(e) => {
        e.preventDefault()
        setDisplaytoggle("none")
        await editNote(enote.id, enote.title, enote.description, enote.tag)
    };
    const myStyle = {
        display : displaytoggle
    }
    

    return (
        <>
            <div>
                <h2 className="text-2xl font-medium leading-tight text-primary grid place-content-center my-6">Your Notes</h2>
                <div className='flex flex-wrap justify-center'>
                        {notes.length <= 0 && <div className='mb-6'>No notes to display</div>}
                    {notes.map((e) => {
                        return <Noteitem key={e._id} e={e} getDataFromClick={getDataFromClick} />
                    })}
                </div>
            </div>

            <div id='container' style={myStyle} onClick={onClose} className='fixed inset-0 bg-opacity-50 bg-white backdrop-blur-sm flex justify-center items-center'>
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
                                <Input size="lg" label="Title" type="text" value={enote.title} id="title" name='title' onChange={onChange}  required minLength={5}/>
                                <Input size="lg" label="Description" value={enote.description} type="text" id="description" name='description' onChange={onChange}  required minLength={9}/>
                                <Input size="lg" label="Tag" type="text" value={enote.tag} id="tag" name='tag' onChange={onChange} />
                            </div>
                            <Button disabled={enote.title.length<5 || enote.description.length < 9} className="mt-6" fullWidth onClick={updateNotefnc}>
                                Update note
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </>
    )
}
