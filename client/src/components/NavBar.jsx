import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { usePopupState } from 'material-ui-popup-state/hooks';
import NewTodoFormDialog from './NewTodoFormDialog';
import { useAppState } from '../providers/AppState';
import { APIs } from '../utils';

export default function NavBar() {

    const { todos, setTodos } = useAppState();
    const { allTodos, setAllTodos } = useAppState();

    const dialogStateItem = usePopupState({ variant: 'dialog', popupId: 'new-list' });
    const dialogStateListName = usePopupState({ variant: 'dialog', popupId: 'new-list' });

    return (

        <Box sx={{ flexGrow: 0 }}>
            <AppBar
                position="fixed"
                sx={{ zIndex: theme => theme.zIndex.drawer + 1, backgroundColor: 'cadetblue' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        React Todo List
                    </Typography>
                    <Button color="inherit" onClick={dialogStateListName.open}>New Todo List</Button>
                    <Button color="inherit" onClick={dialogStateItem.open}>New Todo Item</Button>
                </Toolbar>
            </AppBar>
            <NewTodoFormDialog dialogState={dialogStateItem} todos={todos} setTodos={setTodos} title={"Add Item"} APIURL={APIs.NEW_TODO} />
            <NewTodoFormDialog dialogState={dialogStateListName} todos={allTodos} setTodos={setAllTodos} title={"Add List"} APIURL={APIs.NEW_ALL_TODO_ITEM} />

        </Box>

    );
}