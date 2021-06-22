import React, {useEffect, useState} from 'react';
import TodoForm from './TodoForm';
import TodoDelete from './TodoDelete';
import TodoEdit from './TodoEdit';

function TodoList() {

    const View = {
        TODOS: 0,
        TODO_ADD_FORM: 1,
        TODO_EDIT_FORM: 2,
        TODO_DELETE_FORM: 3
    }

    const [todoItems, setTodoItems] = useState([]);
    const [currentTodo, setCurrentTodo] = useState();
    const [currentView, setCurrentView] = useState(View.TODOS);

    const fetchAll = () => {
        return fetch("http://localhost:8080/api/todos")
            .then( r => {
            if (r.status === 200) {
                return r.json();
            }
            throw new Error("fetch all todos wasn't 200 OK");
        })
        .then(setTodoItems);
    };

    useEffect(() => {
        fetchAll()
            .catch(err => console.error(err));
    }, []);

    const addClick = () => {
        setCurrentTodo();
        setCurrentView(View.TODO_ADD_FORM);
    };

    const editClick = evt => {
        const todo = todoItems.find(t => t.id === parseInt(evt.target.value, 10));
        setCurrentTodo(todo);
        setCurrentView(View.TODO_EDIT_FORM);
    }

    const saveTodo = todo => {
        if (todo) {
            const init = {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(todo)
            }
            if (todo.id > 0) { // update
                init.method = "PUT";

                fetch(`http://localhost:8080/api/todos/${todo.id}`, init)
                    .then(r => {
                        if (r.status === 204) {
                            return fetchAll();
                        }
                        throw new Error("Update was not 204.");
                    })
                    .catch(console.error);

            } else { // add
                init.method = "POST";

                fetch(`http://localhost:8080/api/todos`, init)
                    .then(r => {
                        if (r.status === 201) {
                            return fetchAll();
                        }
                        throw new Error("Update was not 204.");
                    })
                    .catch(console.error);
            }
        }
        setCurrentView(View.TODOS);
    };

    const deleteClick = evt => {
        const todo = todoItems.find(t => t.id === parseInt(evt.target.value, 10));
        setCurrentTodo(todo);
        setCurrentView(View.TODO_DELETE_FORM);
    };

    const deleteTodo = (todoId) => {
        fetch(`http://localhost:8080/api/todos/${todoId}`, { method: "DELETE" })
                .then(r => {
                    if (r.status === 204) {
                        return fetchAll();
                    }
                    throw new Error("Delete was not 204.");
                })
                .catch(console.error);
        setCurrentView(View.TODOS);
    };

    if(currentView === View.TODO_ADD_FORM) {
        return (
            <TodoForm saveTodo={saveTodo} currentTodo={currentTodo}/>
        );
    } else if (currentView === View.TODO_DELETE_FORM) {
        return (
            <TodoDelete saveTodo={saveTodo} currentTodo={currentTodo} deleteTodo={deleteTodo}/>
        );
    } else if (currentView === View.TODO_EDIT_FORM) {
        return (
            <TodoEdit saveTodo={saveTodo} currentTodo={currentTodo}/>
        );
    }
    return (
        <>
        {console.log(todoItems)}
        <div className="row">
            <div className="col">
                <h1>Todo App</h1>
            </div>
            <div className="col">
                <button className="btn btn-primary" onClick={addClick}>Add</button>
            </div>
            <div className="row">
                <ul className="list-group">
                    {todoItems.map(i => <li key={i.id} className="list-group-item">{i.description}
                    <button className="btn btn-secondary ms-2 me-2" value={i.id} onClick={editClick}>Edit
                    </button><button className="btn btn-danger me-2" onClick={deleteClick}
                     value={i.id}>Delete</button></li>)}
                </ul>
            </div>
            
        </div>
        </>
    );
}

export default TodoList;