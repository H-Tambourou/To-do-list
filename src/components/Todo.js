import React from 'react';
import {Checkbox, Button, ListItem, Typography} from '@material-ui/core';


function Todo({todo, toggleTodo, deleteTodo}) {

    function handleTodoClick(){
        toggleTodo(todo.id);
    };
    function handleDeleteTodo(){
        deleteTodo(todo.id);
    };

    return(
        <ListItem style={{display:'flex', justifyContent:'center', alignItems:'center'}}> 
    
            <Checkbox checked={todo.complete} onChange={handleTodoClick} />
            <Typography variant="body1" style={{textDecoration: todo.complete ? 'line-through': null}}>{todo.name}</Typography>
            <Button onClick={handleDeleteTodo}>X</Button>
        </ListItem>
    )
}
export default Todo;