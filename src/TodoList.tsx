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
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}


export const TodoList  = (props: TodolistPropsType) => {


    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement> )=> setNewTaskTitle(e.currentTarget.value)

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>)=>{
        if (e.key === 'Enter'){
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    const addTaskHandler =()=> {
        if (newTaskTitle.trim() === "") {
            return
        }

        props.addTask(newTaskTitle)
        setNewTaskTitle('')
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
                />
                <button onClick={addTaskHandler}>+</button>
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
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};