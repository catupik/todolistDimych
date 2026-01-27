import type {FilterValuesType} from "./App.tsx";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}


export const TodoList  = (props: TodolistPropsType) => {



    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t=> <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={()=>props.removeTask(t.id)}>X</button>
                    </li>)
                }

            </ul>
            <div>
                <button onClick={()=> props.changeFilter('all')}>All</button>
                <button onClick={()=> props.changeFilter('active')}>Active</button>
                <button onClick={()=> props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};