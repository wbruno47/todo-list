const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Todo = require('./models/Todo');
const List = require('./models/List');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/todo-list", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to DB"))
    .catch(console.error);

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
    //console.log("here");
})

app.get('/todos/:id', async (req, res) => {
    // const todos = await Todo.find();
    const todos = await List.findById(req.params.id).populate('data');
    res.json(todos);
    console.log(todos);
    //console.log("here");
})


app.post('/todos/new', async (req, res) => {
    console.log(req.body);
    const list = await List.findById(req.body.parentId);
    const todo = new Todo({
        text: req.body.text,
        parent: list
    });
    todo.save();
    list.data.push(todo);
    list.save();
    res.json(todo);
})

//find and delete must be identical to :id text
app.delete('/todos/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
})

app.patch('/todos/update/:id', async (req, res) => {
    console.log(req.body);
    console.log(req.params);

    const updatedItem = await Todo.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true })
    console.log(updatedItem);
    res.json(updatedItem);
    await updatedItem.save();

})

app.put('/todos/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;

    todo.save();
    res.json(todo);
})

app.get('/lists', async (req, res) => {
    const lists = await List.find();
    res.json(lists);
    //console.log("here");
})
app.post('/lists/new', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    const list = new List({
        text: req.body.text
    });
    list.save();
    res.json(list);
})

app.post('/lists/update/:id', async (req, res) => {
    const listItem = await List.findById(req.body.data);
    listItem.data.push(data);
    await listItem.save();
})
//find and delete must be identical to :id text
app.delete('/lists/delete/:id', async (req, res) => {
    const result = await List.findByIdAndDelete(req.params.id);
    res.json(result);
})

app.get('/', (req, res) => {
    res.send("HERE IN THE APP");
})

app.listen(3001, () => console.log("Server started on port 3001")); 