import React, {useContext} from "react";
import {TodoContext} from "../contexts/TodoContext";

function TodosList() {

    const context = useContext(TodoContext);

    return (
        <div>
            {context.todos.map(todo => (
                <div key={todo.title}><em>{todo.title}: {todo.text}</em></div>
            ))}
        </div>
    );
}

export default TodosList;