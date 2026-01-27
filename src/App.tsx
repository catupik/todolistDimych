import './App.css'
import {type TaskType, TodoList} from "./TodoList.tsx";
import {useState} from "react";
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {



    const [tasks, setTasks] = useState<TaskType[]>(
        [
            {id: v1(), title: 'Css', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'react', isDone: false},
        ]
    )

    const [filter, setFilter] = useState<FilterValuesType>('all')


    const removeTask = (id: string) => {
        const filteredTasks = tasks.filter((t)=> {
            return t.id !== id
        })
        setTasks(filteredTasks);
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
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

    let tasksForTodolist = tasks
    if (filter === 'completed'){
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    if (filter === 'active'){
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }

    return (
        <div className="App">
            <TodoList
                title={"what to learn"}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
            />


        </div>
    )
}

export default App
