import './App.css'
import {type TaskType, TodoList} from "./TodoList.tsx";
import {useState} from "react";


export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {



    const [tasks, setTasks] = useState<TaskType[]>(
        [
            {id: 1, title: 'Css', isDone: true},
            {id: 2, title: 'JS', isDone: true},
            {id: 3, title: 'react', isDone: false},
        ]
    )

    const [filter, setFilter] = useState<FilterValuesType>('all')


    const removeTask = (id: number) => {
        const filteredTasks = tasks.filter((t)=> {
            return t.id !== id
        })
        setTasks(filteredTasks);
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
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
            />


        </div>
    )
}

export default App
