import React, { useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext";
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";

export default function Popup() {
  
  const context = useContext(noteContext);
  const { visible, setVisibility } = context;
  const [enote, setNote] = useState({ title: "", description: "", tag: "default" })
  const onClose = (e) => {
    if(e.target.id === 'container') {setVisibility(false)}
  }
  const onChange = (e) => {
    setNote({ ...enote, [e.target.name]: e.target.value })
  }
  const updateNotefnc = () => {
    setVisibility(false)
  };
  if(!visible) return null;
  return (
    <div id='container' onClick={onClose} className='fixed inset-0 bg-opacity-50 bg-white backdrop-blur-sm flex justify-center items-center'> 
      <div className='grid place-content-center'>
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Add Notes
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your details as title and description.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div  className="mb-4 flex flex-col gap-6">
                        <Input size="lg" label="Title" type="text" value={""} id="title" name='title' onChange={onChange}/>
                        <Input size="lg" label="Description" value={""}  type="text" id="description" name='description' onChange={onChange} />
                        <Input size="lg" label="Tag" type="text" value={""}  id="tag" name='tag' onChange={onChange} />
                    </div>
                    <Button className="mt-6" fullWidth onClick={updateNotefnc}>
                        Update note
                    </Button>
                </form>
            </Card>
        </div>
    </div>
  )
}
