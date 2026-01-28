import type {FilterValuesType} from "./App.tsx";
import  {type ChangeEvent, type KeyboardEvent, useState} from "react";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}


export const TodoList  = (props: TodolistPropsType) => {


    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement> )=> setNewTaskTitle(e.currentTarget.value)

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>)=>{
        setError(null)
        if (e.key === 'Enter'){
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    const addTaskHandler =()=> {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        } else {
            setError("Title is required")
        }
    }

    const onAllClickHandler =()=> props.changeFilter('all')
    const onActiveClickHandler =()=> props.changeFilter('active')
    const onCompletedClickHandler =()=> props.changeFilter('completed')


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    className={error ? "error" : ""}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t=> {
                        const removeTaskHandler =()=> {props.removeTask(t.id)}
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>)=>
                            props.changeStatus(t.id, e.currentTarget.checked)
                        return(
                        <li key={t.id}>
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