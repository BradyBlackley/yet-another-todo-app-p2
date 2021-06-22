import React, {useState} from 'react';
import {emptyTodo} from './data';

function TodoAdd({currentTodo = emptyTodo, saveTodo}) {

    const[todo, setTodo] = useState({
        ...currentTodo
    });

    const onChange = evt => {
        const nextTodo = {...todo };
        nextTodo[evt.target.name] = evt.target.value;
        setTodo(nextTodo);
    };

    const onSubmit = evt => {
        evt.preventDefault();
        saveTodo(todo);
    };

    const cancel = () => saveTodo(emptyTodo);
    

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="todoDescription">Description</label>
                <input type="text" className="form-control" 
                    value={todo.description} onChange={onChange} 
                    id="todoDescription" name="description" required/>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary me-2">Save</button>
                <button className="btn btn-secondary me-2" onClick={cancel}>Cancel</button>
            </div>
        </form>
    );
}

export default TodoAdd;