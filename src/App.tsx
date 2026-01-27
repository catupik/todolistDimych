import './App.css'
import {TodoList} from "./TodoList.tsx";
import {useState} from "react";

function App() {



    const [tasks, setTasks] = useState(
        [
            {id: 1, title: 'Css', isDone: true},
            {id: 3, title: 'JS', isDone: true},
            {id: 3, title: 'react', isDone: false},
        ]
    )

    const removeTask = (id: number) => {
        const newTasks = tasks.filter((t)=> {
            return t.id !== id
        })
        setTasks(newTasks);
    }

    return (
        <div className="App">
            <TodoList
                title={"what to learn"}
                tasks={tasks}
                removeTask={removeTask}
            />


        </div>
    )
}

export default App
