import React, {Fragment, useContext, useEffect} from "react";
import {Form} from "../components/Form";
import {Notes} from "../components/Notes";
import {FirebaseContext} from '../context/firebase/firebaseContext';
import {Loader} from '../components/Loader';
import empty from '../img/empty.png';

export const Home = () => {

    const {loading, notes, fetchNotes, removeNote} = useContext(FirebaseContext);

    useEffect(()=>{
        fetchNotes();
    }, []);

    return (

        <React.Fragment>
            <Form />

            <hr />

            {loading
            ? <Loader />
            : notes.length ? <Notes notes={notes} onRemove={removeNote}/>
            : <img className="emptyImg" src={empty} alt="" />
            }

        </React.Fragment>
    )
}