import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button, Typography } from '@material-ui/core';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {

  const [todos, setTodos] = useState([]);
  const contentRef = useRef();
  
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() =>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleAdd(e) {
    const content = contentRef.current.value;
    if(content ==='') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: content, complete: false }];
    });
    contentRef.current.value = null; 
  }
  //In react you should avoid directly modifying a state variable, instead create a copy, modify the copy then render it
  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);

  }
  function deleteTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.filter(todo => todo.id !== id);
    setTodos(todo);
  }

  return (
    <div className="App">
      <Typography variant="h2"> To Do List </Typography>
      <input style={{border:'none', borderBottom: '1px solid', outline:'none', backgroundColor:'transparent'}} ref={contentRef} type="text" /> 
      <Button onClick={handleAdd}>Submit</Button>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/> 
    </div>
  );
}

export default App;
