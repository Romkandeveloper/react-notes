import React from 'react';

export const Notes = ({notes, onRemove}) => {

    return (
        <ul className="list-group">

            {notes.map(note =>
                <li
                    className="list-group-item note"
                    key={note.is}
                >
                    <div className="note__info">
                        <strong className="note__title">{note.title}</strong>
                        <small className="note__date">{note.date}</small>
                    </div>

                    <button
                         type="button"
                         onClick={() => onRemove(note.id)}
                         className="btn btn-sm btn-outline-danger"
                      >
                            &times;
                    </button>
                </li>
            )}

        </ul>
    );
}