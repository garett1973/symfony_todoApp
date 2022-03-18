import React, {Component} from 'react';
import ReactDom from 'react-dom';
import TodoContextProvider from "./contexts/TodoContext";
import TodosList from "./components/TodosList";

class App extends Component {
    render() {
        return (
            <TodoContextProvider>
                <TodosList/>
            </TodoContextProvider>
        );
    }
}

ReactDom.render(<App/>, document.querySelector('#root'));
