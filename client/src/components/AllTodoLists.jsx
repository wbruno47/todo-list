import { useState, useEffect } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    IconButton,
    Box,
} from '@mui/material';
import { useAppState } from '../providers/AppState';
import { APIs } from '../utils';

export function AllTodoLists() {
    const { allTodos, setAllTodos } = useAppState();
    const { setCurrentId } = useAppState();

    useEffect(() => {
        getAllTodos();
    }, []);

    async function getAllTodos() {
        await fetch(APIs.GET_ALL_TODOS)
            .then(res => res.json())
            .then(data => {
                setAllTodos(data);
                setCurrentId(data[0]?._id);
            })
            .catch(err => console.log("ERROR: ", err));
    }


    const removeTodo = async (id) => {
        console.log("remove: " + id);
        const data = await fetch(APIs.REMOVE_ALL_TODO_ITEM + id, {
            method: 'delete'
        }).then(res => res.json());

        setAllTodos(prevTodos => {
            return prevTodos.filter((t) => t._id != data._id);
        });
    }

    return (
        <Drawer
            sx={{
                width: 0.25,
                minWidth: 200,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 0.25,
                    flexShrink: 0,
                    minWidth: 200,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            {/*Empty Toolbar for spacing*/}
            <Toolbar />
            <Box>
                <List>
                    {allTodos.map((listItem) => {
                        // console.log(listItem._id);
                        return (
                            <ListItem key={listItem._id}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="comments" onClick={() => removeTodo(listItem._id)}>
                                        <HighlightOffIcon />
                                    </IconButton>
                                } disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        console.log(listItem._id);
                                        setCurrentId(listItem._id);
                                    }}
                                // selected={currentList === id}
                                >
                                    {/* {Icon ? <Icon /> : <Icons.List />} */}
                                    <ListItemText sx={{ ml: 0.5 }} primary={listItem.text} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </Drawer>
    )
}
