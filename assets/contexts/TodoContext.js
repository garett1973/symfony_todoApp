import React, {Component, createContext} from 'react';
import axios from "axios";
export const TodoContext = createContext();


class TodoContextProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [
            //     {
            //     'id': 0,
            //     'task': 'cook hot sandwiches',
            //     'isCompleted': 'false',
            // },
            // {
            //     'id': 1,
            //     'task': 'drink some beer',
            //     'isCompleted': 'true',
            // }
            ],
        };
        this.readTodo();
    }

    // todo: create
    // createTodo(e, task) {
    createTodo(e, todo) {
        e.preventDefault();
        // let todos = [task, ...this.state.todos];
        // this.setState({todos});

        axios.post('/todo/create', todo)
            .then(response => {
                console.log(response.data);
                const data = [...this.state.todos];
                data.push(response.data.todo);
                this.setState({
                    todos: data,
                });
            }).catch(error => {
                console.error(error);
        })
    }

    // todo: read

    readTodo() {
        axios.get('/todo/read')
            .then(response => {
                this.setState({
                    todos: response.data,
                });
            })
            .catch(error => {
                console.error(error);
            })
    }

    // todo: update

    updateTodo(data) {
        const todos = [...this.state.todos];
        const todo = todos.find(todo => {
            return todo.id === data.id;
        });

        todo.task =  data.task;
        this.setState({todos});
    }

    // todo: delete

    deleteTodo(data) {
        const todos = [...this.state.todos];
        const todoToDelete = todos.find(todo => {
            return todo.id === data.id;
        });

        todos.splice(todos.indexOf(todoToDelete), 1);

        this.setState({
            todos
        });
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