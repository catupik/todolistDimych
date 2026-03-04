import type {FilterValuesType} from "./App.tsx";
import {type ChangeEvent} from "react";
import './App.css'
import {AddItemForm} from "./AddItemForm.tsx";

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


    return (
        <div>
            <h3>{props.title}<button onClick={removeTodolist}>X</button></h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t=> {
                        const removeTaskHandler =()=> {props.removeTask(t.id, props.id)}
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>)=>
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        return(
                        <li key={t.id} className={t.isDone? "is-done" : ""}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={onChangeStatusHandler}/>
                            <span>{t.title}</span>
                            <button onClick={removeTaskHandler}>X</button>
                        </li>)
                    })
                }

            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};

