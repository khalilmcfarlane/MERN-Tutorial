import { useState, useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoForm from './TodoForm'

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {

     const getData = async () => {
        const response = await axios.get("http://localhost:8000/todos");
        const data = await response.data;
        setTodos(data);
     }

     getData();
  }, []);
  
  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);

  }
  return (
    <div>
      <h1>MERN Stack TODO APP</h1>
      <TodoForm onAdd={addTodo}/>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  )
 
}

export default App;
