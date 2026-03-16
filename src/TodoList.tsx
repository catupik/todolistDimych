import type {FilterValuesType} from "./App.tsx";
import {type ChangeEvent} from "react";
import './App.css'
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (newTitle: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}


export const TodoList  = (props: TodolistPropsType) => {

    const onAllClickHandler =()=> props.changeFilter('all', props.id)
    const onActiveClickHandler =()=> props.changeFilter('active', props.id)
    const onCompletedClickHandler =()=> props.changeFilter('completed', props.id)
    const removeTodolist = ()=> {
        props.removeTodolist(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onChangeTodolistTitleHandler = (newValue: string) => {
        props.changeTodolistTitle(props.id, newValue)
    }


    return (
        <div>

                <h3><EditableSpan title={props.title} onChange={onChangeTodolistTitleHandler}/>
            <IconButton aria-label="delete" size="small">
                <DeleteIcon onClick={removeTodolist} fontSize="inherit" />
            </IconButton>
                </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t=> {
                        const removeTaskHandler =()=> {props.removeTask(t.id, props.id)}
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>)=>
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        const onChangeTaskTitleHandler = (newValue: string)=> {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }


                        return(
                        <li key={t.id} className={t.isDone? "is-done" : ""}>
                            <Checkbox  checked={t.isDone}
                                       onChange={onChangeStatusHandler}/>

                            <EditableSpan title={t.title} onChange={onChangeTaskTitleHandler}/>
                            <IconButton aria-label="delete" size="small">
                                <DeleteIcon onClick={removeTaskHandler} fontSize="inherit" />
                            </IconButton>

                        </li>)
                    })
                }

            </ul>
            <div>

                <Button variant={props.filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>All</Button>
                <Button variant={props.filter === "active" ? "contained" : "text"} color={'secondary'} onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === "completed" ? "contained" : "text"}  color={'success'} onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    );
};

