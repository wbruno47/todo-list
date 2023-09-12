import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { APIs } from '../utils';
import { useAppState } from '../providers/AppState';
//import { useAppState } from '../providers/AppState';

export default function NewTodoFormDialog({ dialogState, todos, setTodos, title, APIURL }) {
    const [state, setState] = useState('');
    const { currentId } = useAppState();
    //const { todos, setTodos } = useAppState();

    const getData = async () => {
        console.log("currentId: " + currentId);
        if (APIURL === APIs.NEW_TODO) {
            return await fetch(APIURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: state,
                    parentId: currentId,
                })
            }).then(res => res.json());
        } else if (APIURL === APIs.NEW_ALL_TODO_ITEM) {
            return await fetch(APIURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: state,
                })
            }).then(res => res.json());
        }
    }
    const newItemText = async () => {
        console.log(APIURL);
        const data = await getData();
        dialogState.close();
        setTodos(prevTodos => {
            return [...prevTodos, data]
        })
        setState('');
        // console.log(data);
        // console.log("ADD NEW: " + title);
        // console.log(data);

    }

    return (
        <Dialog open={dialogState.isOpen} onClose={dialogState.close}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <TextField

                    onChange={event => {
                        setState(event.target.value);
                    }}
                    value={state}
                    autoFocus
                    margin="dense"
                    id="text"
                    label="Todo Item"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={dialogState.close}>Cancel</Button>
                <Button onClick={newItemText}>{title}</Button>
            </DialogActions>
        </Dialog>
    );
}