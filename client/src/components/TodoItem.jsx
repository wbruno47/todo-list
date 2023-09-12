import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function TodoItem({ todo, removeTodo, toggleTodo, openDialog }) {
    // console.log(todo);
    const labelId = `checkbox-list-label-${todo._id}`;
    // console.log(todo);
    return (
        <ListItem
            onClick={openDialog}
            key={todo._id}
            secondaryAction={
                <IconButton edge="end" aria-label="comments" onClick={removeTodo}>
                    <HighlightOffIcon />
                </IconButton>
            }
            disablePadding
        >
            <ListItemButton role={undefined} dense>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={todo.complete}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        onChange={toggleTodo}
                    />
                </ListItemIcon>
                <ListItemText id={labelId} primary={todo.text} />
            </ListItemButton>
        </ListItem>
    );
}