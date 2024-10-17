const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://khalilmcfarlane0:<db_password>@test-cluster.lfwg9.mongodb.net/?retryWrites=true&w=majority&appName=Test-Cluster", {
    useNewUrlParser: true, useUnifiedTopology: true
})

const todoSchema = new mongoose.Schema({
    task: String,
    completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

app.get("/todos", async(req, res) => {
    const todos = await Todo.find();
    res.json(todos);
})


app.post("/todos", async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.json(newTodo);
})

// Update an existing todo
app.put('/todos/:id', async (req, res) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTodo);
})

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
    await Todo.findByIdAndRemove(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})