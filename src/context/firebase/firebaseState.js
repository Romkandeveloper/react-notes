import React, {useReducer} from 'react';
import {FirebaseContext} from './firebaseContext';
import {firebaseReducer} from './firebaseReducer';
import axios from 'axios';
import {SHOW_LOADER, REMOVE_NOTE, FETCH_NOTES, ADD_NOTE} from '../types';

const url = process.env.REACT_APP_DB_URL;

export const FirebaseState = ({children}) => {

    const initialState = {
        notes: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(firebaseReducer, initialState);

    const showLoader = () => dispatch({type: SHOW_LOADER});

    const fetchNotes = async () => {
        showLoader();
        let payload = null;
        const res = await axios.get(`${url}/notes.json`)

        if (res.data) {

            debugger;
            payload = Object.keys(res.data).map(key => {
                    return {
                        ...res.data[key],
                        id: key
                    }
             })
        }else {
            payload = [];
        }

        dispatch({type: FETCH_NOTES, payload})
    }

    const addNote = async title => {
        const note = {
            title, date: new Date().toJSON()
        }

        const res = await axios.post(`${url}/notes.json`, note);

        const payload = {
            ...note,
            id: res.data.name,
        }

        dispatch({type: ADD_NOTE, payload});
    }

     const removeNote = async id => {

            await axios.delete(`${url}/notes/${id}.json`);
            dispatch({
                type: REMOVE_NOTE,
                payload: id
            })
     }

    return (
        <FirebaseContext.Provider value={{showLoader, addNote, removeNote, fetchNotes, loading: state.loading, notes: state.notes}}>
            {children}
        </FirebaseContext.Provider>
    )
}