import React from "react";
import { toggleArchive } from "../api";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Notes({ notes, onToggleArchive, onDeleteNote }) {
    if (!notes || notes.length === 0) {
        return <p>No notes available</p>
    };

    return (
<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-[#2A324B] text-[#2A324B] p-4 rounded">
  {notes.map(note => (
    <li
      key={note.id}
      className="border rounded shadow-sm bg-[#F7C59F] flex flex-col justify-between"
    >   
        <div className="flex flex-wrap justify-between items-center gap-1">
            <div className="flex flex-wrap gap-2 max-w-[60%]">
                {note.tags?.length > 0 && (
                note.tags.map(tag => (
                    <span
                    key={tag.id}
                    className="bg-white font-[550] text-[#2A324B] px-2 py-1 rounded rounded-tr-4xl rounded-br-4xl text-sm shadow"
                    >
                    Tag: {tag.name}
                    </span>
                ))
                )}
            </div>
            <button
                onClick={() => onToggleArchive(note.id)}
                className="flex-shrink-0 bg-[#F08D42] text-white px-2 py-0.5 rounded rounded-tl-4xl rounded-bl-4xl hover:bg-[#AA510E] hover:cursor-pointer"
            >
                {note.archived ? 'Unarchive' : 'Archive'}
            </button>
        </div>
        <h3 className="font-semibold text-center text-lg mb-4 mt-4">{note.title}</h3>
        <p className="text-center mb-10">{note.content}</p>
        <div className="flex flex-row justify-center">
            <Link to={`/update/${note.id}`} className="text-white bg-[#F08D42] px-3 py-1 hover:bg-[#AA510E] flex self-center max-w-fit rounded-tr-2xl rounded-tl-2xl">Edit Note</Link>
            <button 
                onClick={() => onDeleteNote(note.id)}
                className="relative group self-end text-red-500 hover:text-red-700 hover:cursor-pointer ml-2"
            >
            <FontAwesomeIcon icon={faTrash} size="lg" />
            <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 text-sm bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                Delete Note
            </span>
            </button>
        </div>
    </li>
  ))}
</ul>

    );
};