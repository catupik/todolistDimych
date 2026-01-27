
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: number) => void
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
                    props.tasks.map(t=> <li><input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={()=>props.removeTask(t.id)}>X</button>
                    </li>)
                }

            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};