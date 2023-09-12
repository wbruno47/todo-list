import { useState, useEffect } from 'react';
import List from '@mui/material/List';

import { usePopupState } from 'material-ui-popup-state/hooks';
import TodoItem from './TodoItem';
import { Box, Card, CardContent, CardHeader, ListItem, ListItemText, Toolbar } from '@mui/material';

import { APIs } from '../utils';
import { useAppState } from '../providers/AppState';
import EditTodoFormDialog from './EditTodoFormDialog';

export default function TodoList() {

    const dialogStateEdit = usePopupState({ variant: 'dialog', popupId: 'new-list' });

    const { todos, setTodos } = useAppState();
    const { currentId } = useAppState();
    const [title, setTitle] = useState('');
    const [editId, setEditId] = useState('');
    const [editText, setEditText] = useState('');

    useEffect(() => {
        if (currentId) {
            getTodos();
        }
    }, [currentId]);

    const getTodos = async () => {
        //console.log(currentId);
        //console.log("HERE " + APIs.GET_TODOS + currentId);
        await fetch(APIs.GET_TODOS + currentId)
            .then(res => res.json())
            .then((data) => {
                setTodos(data.data);
                //  console.log(data.text);
                setTitle(data.text);
            })
            .catch(err => console.log("Error: ", err));
    }

    const removeTodo = async (id) => {
        const data = await fetch(APIs.REMOVE_TODO + id, {
            method: 'delete'
        })
            .then(res => res.json());

        setTodos(prevTodos => {
            return prevTodos.filter((t) => t._id != data._id);
        });
    }

    const toggleTodo = async (id) => {
        //console.log(id);
        const data = await fetch(APIs.TOGGLE_COMPLETE_TODO + id, {
            method: "PUT"
        })
            .then(res => res.json());

        setTodos(prevTodos => {
            return prevTodos.map(todo => {
                if (todo._id === data._id) {
                    return { ...todo, complete: !todo.complete }
                } else {
                    return todo;
                }
            })
        })
    }

    const openEditPopUp = (id, text) => {
        console.log("OPOEN DIALOG: " + text + " " + editText);
        setEditId(id);
        setEditText(text);
        dialogStateEdit.open();
    }

    const dialogResponse = async (didEdit, text) => {
        dialogStateEdit.close();
        console.log(editId + " " + didEdit + " " + text);
        console.log(APIs.EDIT_TODO + editId)
        if (didEdit) {
            const data = await fetch(APIs.EDIT_TODO + editId, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: text,
                })
            }).then(res => res.json())
                .catch(err => console.log(err.message));

            setTodos(prevTodos => {
                return prevTodos.map(todo => {
                    if (todo._id === data._id) {
                        return { ...todo, text: data.text }
                    } else {
                        return todo;
                    }
                })
            })

            console.log(data);
            console.log(editId);

        } else {
            console.log("CANCELED")
        }
    }

    const fillList = () => {
        if (todos && todos.length) {
            return (
                todos.map((todo) => (
                    <TodoItem openDialog={() => openEditPopUp(todo._id, todo.text)}
                        todo={todo} key={todo._id}
                        removeTodo={() => removeTodo(todo._id)}
                        toggleTodo={() => toggleTodo(todo._id)} />
                ))
            );
        } else {
            return (
                <ListItem >
                    <ListItemText primary="Add some items to your list!!" />
                </ListItem>
            )
        }
    }

    return (

        <Box component="main" sx={{
            flexGrow: 2,
            p: 3
        }}>
            <Toolbar />
            <EditTodoFormDialog dialogState={dialogStateEdit} dialogResponse={dialogResponse} currentText={editText} />

            <Box sx={{
                flex: 1,
                display: 'flex',
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <Card sx={{
                    minWidth: '75%',
                }} raised={true}>
                    <CardContent>
                        {/* <Typography variant="h3" component="h3" sx={{ flexGrow: 1 }}> */}
                        <CardHeader sx={{ borderBottom: '2px solid cadetblue' }} title={title} />
                        {/* </Typography> */}
                        {/* {console.log(todos)} */}
                        {/* maxWidth: 360, */}

                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            {fillList()}
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}



// export default function CheckboxList() {
//     const [checked, setChecked] = React.useState([0]);

//     const handleToggle = (value: number) => () => {
//         const currentIndex = checked.indexOf(value);
//         const newChecked = [...checked];

//         if (currentIndex === -1) {
//             newChecked.push(value);
//         } else {
//             newChecked.splice(currentIndex, 1);
//         }

//         setChecked(newChecked);
//     };

//     return (
//         <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//             {[0, 1, 2, 3].map((value) => {
//                 const labelId = `checkbox-list-label-${value}`;

//                 return (
//                     <ListItem
//                         key={value}
//                         secondaryAction={
//                             <IconButton edge="end" aria-label="comments">
//                                 <CommentIcon />
//                             </IconButton>
//                         }
//                         disablePadding
//                     >
//                         <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
//                             <ListItemIcon>
//                                 <Checkbox
//                                     edge="start"
//                                     checked={checked.indexOf(value) !== -1}
//                                     tabIndex={-1}
//                                     disableRipple
//                                     inputProps={{ 'aria-labelledby': labelId }}
//                                 />
//                             </ListItemIcon>
//                             <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
//                         </ListItemButton>
//                     </ListItem>
//                 );
//             })}
//         </List>
//     );
// }
