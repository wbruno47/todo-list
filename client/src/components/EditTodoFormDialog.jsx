import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
//import { useAppState } from '../providers/AppState';

export default function EditTodoFormDialog({ dialogState, dialogResponse, currentText }) {
    const [state, setState] = useState(currentText);

    return (
        <Dialog open={dialogState.isOpen} onClose={dialogState.close}>
            <DialogTitle>Edit</DialogTitle>
            <DialogContent>
                <TextField
                    onChange={event => {
                        setState(event.target.value);
                    }}
                    defaultValue={currentText}
                    autoFocus
                    margin="dense"
                    id="text"
                    label=""
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { dialogResponse(false); setState('') }}>Cancel</Button>
                <Button onClick={() => { dialogResponse(true, state); setState('') }}>Edit</Button>
            </DialogActions>
        </Dialog>
    );
}