import React from 'react';
import { emptyTodo } from './data';

function TodoDelete ({currentTodo = emptyTodo, saveTodo, deleteTodo}) {

    const cancel = evt => {
        evt.preventDefault();
        saveTodo(emptyTodo);
    }

    const yesDelete = () => {
        deleteTodo(currentTodo.id);
    }

    return (
        <div>
            <div>
                <div className="alert alert-danger" role="alert">Really delete? <button onClick={cancel} className="btn btn-secondary">Cancel</button></div>
            </div>
            <div>
                <button onClick={yesDelete} className="btn btn-danger">Delete</button>
            </div>
        </div>
    );
}

export default TodoDelete;