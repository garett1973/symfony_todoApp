import React, {Component} from 'react';
import ReactDom from 'react-dom';
import TodoContextProvider from "./contexts/TodoContext";
import TodosList from "./components/TodosList";
import {CssBaseline} from "@mui/material";

class App extends Component {
    render() {
        return (
            <TodoContextProvider>
                <CssBaseline>
                    <TodosList/>
                </CssBaseline>
            </TodoContextProvider>
        );
    }
}

ReactDom.render(<App/>, document.querySelector('#root'));
