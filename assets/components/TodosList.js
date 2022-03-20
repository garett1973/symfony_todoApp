import React, {Fragment, useContext, useState} from "react";
import {TodoContext} from "../contexts/TodoContext";
import {IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteDialog from "../DeleteDialog";


function TodosList() {

    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');
    const [editVisible, setEditVisible] = useState(false);
    const [editTodo, setEditTodo] = useState('');
    const [deleteConfVisible, setDeleteConfVisible] = useState(false);
    const [todoToDelete, setTodoToDelete] = useState(null);

    return (
        <Fragment>
        <form onSubmit={(event) => {
            context.createTodo(event, {
                task: addTodo,
                isCompleted: false,
            })
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
                            <TableCell>
                                {editVisible === todo.id ?
                                    <TextField
                                        fullWidth={true}
                                        value={editTodo}
                                        onChange={(event) => {
                                    setEditTodo(event.target.value);}
                                    }
                                        InputProps={{
                                            endAdornment:
                                            <Fragment>
                                                <IconButton onClick={() => {
                                                setEditVisible(false);
                                                    }
                                                }>
                                                    <CancelIcon/>
                                                </IconButton>
                                                <IconButton onClick={() => {
                                                context.updateTodo({id: todo.id, task: editTodo});
                                                setEditVisible(false);
                                                    }
                                                }>
                                                    <CheckCircleIcon/>
                                                </IconButton>
                                            </Fragment>
                                        }}
                                />
                                    :
                                todo.task
                                }
                            </TableCell>
                            <TableCell align={"right"}>
                               <IconButton onClick={() => {
                                       setEditVisible(todo.id);
                                       setEditTodo(todo.task);
                               }}>
                                   <EditIcon/>
                               </IconButton>
                            </TableCell>
                            <TableCell align={"right"}>
                                <IconButton onClick={() => {
                                    setDeleteConfVisible(true);
                                    setTodoToDelete(todo)
                                }}>
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </form>
            {deleteConfVisible && (
                <DeleteDialog
                    todo={todoToDelete}
                    open={deleteConfVisible}
                    setDeleteConfVisible={setDeleteConfVisible}/>
            )}
        </Fragment>
    );
}

export default TodosList;