import axios from 'axios';

export const GET_NOTES_START = 'GET_NOTES_START';
export const GET_NOTES_SUCCESS = 'GET_NOTES_SUCCESS';
export const GET_NOTES_FAIL = 'GET_NOTES_FAIL';

export const ADD_NOTE_START = 'ADD_NOTE_START';
export const ADD_NOTE_SUCCESS = 'ADD_NOTE_SUCCESS';
export const ADD_NOTE_FAIL = 'ADD_NOTE_FAIL';

export const DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS';
export const DELETE_NOTE_FAIL = 'DELETE_NOTE_FAIL';

export const SET_TARGET_NOTE = 'SET_TARGET_NOTE';

export const NOTE_DETAIL_SUCCESS = 'NOTE_DETAIL_SUCCESS';
export const NOTE_DETAIL_FAIL = 'NOTE_DETAIL_FAIL';

export const UPDATE_NOTE_START = 'UPDATE_NOTE_START';
export const UPDATE_NOTE_SUCCESS = 'UPDATE_NOTE_SUCCESS';
export const UPDATE_NOTE_FAIL = 'UPDATE_NOTE_FAIL';


export const getNotes = () => dispatch => {
  dispatch({
    type: GET_NOTES_START
  })
  axios
    .get('https://lambda-notes-be.herokuapp.com/api/notes/all')
    .then(response => {
      dispatch({
        type: GET_NOTES_SUCCESS,
        payload: response.data,
      })
    })
    .catch(error => {
      dispatch({
        type: GET_NOTES_FAIL,
        payload: error.message,
      })
    })
}

export const addNote = (noteObject, history) => dispatch => {
  dispatch({
    type: ADD_NOTE_START
  })
  axios
    .post('https://lambda-notes-be.herokuapp.com/api/notes/create', noteObject, { headers: { 'Content-Type': 'application/json' }})
    .then(response => {
      dispatch({
        type: ADD_NOTE_SUCCESS,
        payload: response.data
      })
      history.push('/');
    })
    .catch(error => {
      dispatch({
        type: ADD_NOTE_FAIL,
        payload: error.message
      })
    })
}

export const deleteNote = (id, history) => dispatch => {
  console.log('id --> ', id);
  axios
    .delete('https://lambda-notes-be.herokuapp.com/api/notes/delete/'+id)
    .then(response => {
      dispatch({
        type: DELETE_NOTE_SUCCESS,
        payload: response.data,
      })
      history.push('/');
    })
    .catch(error => {
      dispatch({
        type: DELETE_NOTE_FAIL,
        payload: error.message, 
        id
      })
    });
}

export const targetNoteSet = (noteObject) => {
  return {
      type: SET_TARGET_NOTE,
      payload: noteObject,
  }
}

export const noteDetail = (noteID) => dispatch => {
  axios
    .get('https://lambda-notes-be.herokuapp.com/api/notes/'+noteID)
    .then(response => {
      dispatch({
        type: NOTE_DETAIL_SUCCESS,
        payload: response.data[0],
      })
    })
    .catch(error => {
      dispatch({
        type: NOTE_DETAIL_FAIL,
        payload: error.message,
      })
    })
}

export const updateNoteSet = (noteObject, history) => {
  history.push('/update-note');
  return {
      type: UPDATE_NOTE_START,
      payload: noteObject,
  }
}

export const updateNote = (noteID, noteObject, history) => dispatch => {
  axios
    .put('https://lambda-notes-be.herokuapp.com/api/notes/edit/'+noteID, noteObject, { headers: { 'Content-Type': 'application/json' }})
    .then(response => {
      dispatch({
        type: UPDATE_NOTE_SUCCESS,
        payload: response.data
      })
      history.push('/')
    })
    .catch(error=>{
      dispatch({
        type: UPDATE_NOTE_FAIL,
        payload: error.message
      })
    })
}
