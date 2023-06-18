import React from 'react'
import edit from '../icons/icons8-edit-64.png'

import {
    Card,
    CardBody,
    CardFooter,
    Typography
} from "@material-tailwind/react";
import Deleteicon from '../icons/Deleteicon';


import { useContext } from 'react'
import noteContext from "../context/notes/noteContext";

export default function Noteitem(props) {
    const { e ,getDataFromClick } = props;

    const context = useContext(noteContext);
    const { setDisplaytoggle } = context;

    const hendleOnClick = () => {
        setDisplaytoggle("")
        getDataFromClick(e);
    }
    

    return (
        <>

            <Card className="mt-6 w-48 mx-4 text-sm" >
                <CardBody>
                    <Typography variant="h6" color="blue-gray" className="mb-2">
                        {e.title}
                    </Typography>
                    <Typography>
                        {e.description}
                    </Typography>
                </CardBody>
                <CardFooter className="flex justify-between">
                    {/* <i className="fa-solid fa-pen-to-square" onClick={() => {editNote(e._id,e.title,e.description,e.tag)}}></i>
                            <i className="fa-solid fa-trash-can" onClick={() => {deleteNote(e)}}></i> */}
                    
                    <div className='icons'>
                        <img className="" src={edit} alt='edit' onClick={hendleOnClick} ></img>
                    </div>

                    <Deleteicon e={e} />
                </CardFooter>
            </Card>

        </>
    )
}
