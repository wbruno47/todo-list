
import './App.css'
import { Box, CssBaseline } from '@mui/material';

import { AllTodoLists } from './components/AllTodoLists';
import NavBar from './components/NavBar';
import TodoList from './components/TodoList';


import { AppState } from './providers/AppState';
function App() {
  // const [todos, setTodos] = useState([]);
  // const [newDialog, setNewDialog] = useState(false);
  // const [newTodo, setNewTodo] = useState('');

  // useEffect(() => {
  //   getTodos();

  // }, [todos], setTodos);

  // const getTodos = () => {
  //   fetch(API_BASE + `/todos`)
  //     .then(res => res.json())
  //     .then(data => setTodos(data))
  //     .catch(err => console.log("Error: ", err));
  // }

  return (
    <>
      <AppState>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <NavBar />
          <AllTodoLists />
          <TodoList />
        </Box>
      </AppState>
    </>
  )
}

export default App
