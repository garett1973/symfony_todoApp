import React, {useContext} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import PropTypes from "prop-types";
import {TodoContext} from "./contexts/TodoContext";

function DeleteDialog(props) {

    const context = useContext(TodoContext);
    const closeDialog = () => {
        props.setDeleteConfVisible(false)
    }
    return (
        <Dialog onClose={closeDialog} fullWidth={true} maxWidth='sm' open={props.open}>
            <DialogTitle>Are you sure you wish to delete this task?</DialogTitle>
            <DialogContent>
                {props.todo.task}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {closeDialog()}}>Cancel</Button>
                <Button onClick={() => {
                    context.deleteTodo({id: props.todo.id, task: props.todo.task, isCompleted: props.todo.isCompleted});
                    closeDialog();
                }}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}

DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setDeleteConfVisible: PropTypes.func.isRequired,
    todo: PropTypes.shape({
        id: PropTypes.number,
        task: PropTypes.string,
        isCompleted: PropTypes.bool,
    })
}
export default DeleteDialog;