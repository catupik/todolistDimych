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


    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"},
    ])

    const [tasksObj, setTasksObj] = useState({
        [todolistId1]: [
            {id: v1(), title: 'Css', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'react', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'bread', isDone: false},

        ]
    })

    const removeTodolist = (todolistId: string)=> {
        const filteredTodolist = todolists.filter(
        tl=> tl.id !== todolistId)
        setTodolists(filteredTodolist)


        setTasksObj(({ [todolistId]: _, ...rest }) => rest)


    }


    const removeTask = (taskId: string, todolistId: string) => {
        setTasksObj({
            ...tasksObj,
            [todolistId]: tasksObj[todolistId].filter(t => t.id !== taskId)
        })
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const todolist = todolists.find(tl=> tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }

    }

    const addTask = (newTitle: string, todolistId: string) => {
        const task = { id: v1(), title: newTitle, isDone: false }

        setTasksObj({
            ...tasksObj,
            [todolistId]: [...tasksObj[todolistId], task]
        })
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const tasks = tasksObj[todolistId]
        const task = tasks.find(t => t.id === taskId)
        if (task){
            setTasksObj({
                ...tasksObj,
                [todolistId]: tasks.map(t =>
                    t.id === taskId ? { ...t, isDone } : t
                )
            })
        }

    }



    return (
        <div className="App">
            {
                todolists.map((tl)=>{

                    let tasksForTodolist = tasksObj[tl.id]
                    if (tl.filter === 'completed'){
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                    }
                    if (tl.filter === 'active'){
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
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
                        removeTodolist={removeTodolist}
                        filter={tl.filter}
                    />
                })
            }




        </div>
    )
}

export default App
