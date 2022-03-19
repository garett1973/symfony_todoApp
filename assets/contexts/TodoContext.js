import React, {Component, createContext} from 'react';

export const TodoContext = createContext();


class TodoContextProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [{
                'task': 'cook hot sandwiches'
            },
            {
                'task': 'drink some beer'
            }],
        };
    }

    // todo: create
    createTodo(e, task) {
        e.preventDefault();
        let todos = [task, ...this.state.todos];
        this.setState({todos});
    }

    // todo: read

    readTodo() {

    }

    // todo: update

    updateTodo() {

    }

    // todo: delete

    deleteTodo() {

    }


    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this),
            }}>
                {this.props.children}
            </TodoContext.Provider>

        );
    }
}

export default TodoContextProvider;