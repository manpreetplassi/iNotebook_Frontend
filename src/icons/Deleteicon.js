import deleteicon from './icons8-delete-50.png'
import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext";

export default function Deleteicon(props) {
    const { e  } = props;

    const context = useContext(noteContext);
    const {deleteNote}  = context;
  return (
    <div className='icons'>
    <img className="" src={deleteicon} alt='delete'  onClick={() => {deleteNote(e)}}></img>
  </div>
  )
}
