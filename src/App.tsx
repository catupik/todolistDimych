import './App.css'
import {type TaskType, TodoList} from "./TodoList.tsx";
import {useState} from "react";
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}

function App() {



    const [tasks, setTasks] = useState<TaskType[]>(
        [
            {id: v1(), title: 'Css', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'react', isDone: false},
        ]
    )




    const removeTask = (id: string) => {
        const filteredTasks = tasks.filter((t)=> {
            return t.id !== id
        })
        setTasks(filteredTasks);
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const todolist = todolists.find(tl=> tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }

    }

    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        const newTasks = [ newTask, ...tasks]
        setTasks(newTasks)
    }

    const changeStatus = (taskId: string, isDone: boolean) => {
        const task = tasks.find(t => t.id === taskId)
        if (task){task.isDone = isDone}
        setTasks([...tasks])
    }


    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: v1(), title: "What to learn", filter: "active"},
        {id: v1(), title: "What to buy", filter: "completed"},
    ])

    return (
        <div className="App">
            {
                todolists.map((tl)=>{

                    let tasksForTodolist = tasks
                    if (tl.filter === 'completed'){
                        tasksForTodolist = tasks.filter(t => t.isDone)
                    }
                    if (tl.filter === 'active'){
                        tasksForTodolist = tasks.filter(t => !t.isDone)
                    }


                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                    />
                })
            }




        </div>
    )
}

export default App
