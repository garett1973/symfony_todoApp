import React, {useContext, useState} from "react";
import {TodoContext} from "../contexts/TodoContext";
import {IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';


function TodosList() {

    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');

    return (
        <form onSubmit={(event) => {
            context.createTodo(event, {task: addTodo})
        }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Task</TableCell>
                        <TableCell align={"right"}>Add/ Edit</TableCell>
                        <TableCell align={"right"}>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell >
                            <TextField label={"New Task"} fullWidth={true} value={addTodo}
                                       onChange={(event) => {setAddTodo(event.target.value)}}/>
                        </TableCell>
                        <TableCell align={"right"}>
                            <IconButton type="submit">
                                <AddCircleIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    {context.todos.map((todo, index) => (
                        <TableRow key={index}>
                            <TableCell>{todo.task}</TableCell>
                            <TableCell align={"right"}>
                               <IconButton>
                                   <EditIcon/>
                               </IconButton>
                            </TableCell>
                            <TableCell align={"right"}>
                                <IconButton>
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </form>
    );
}

export default TodosList;