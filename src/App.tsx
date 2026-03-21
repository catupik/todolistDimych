import './App.css'
import {type TaskType, TodoList} from "./TodoList.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm.tsx";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}

export type TaskStateType = {
    [key: string]: TaskType[]
}

function App() {


    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ])

    const [tasksObj, setTasksObj] = useState<TaskStateType>({
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


        setTasksObj(prev => {
            const copy = { ...prev }
            delete copy[todolistId]
            return copy
        })


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

    const addTodolist =(title: string)=> {
        const newTodolist : TodolistType = {
            id: v1(),
            title,
            filter: "all"
        }
        setTodolists(prev=> [...prev, newTodolist])
        setTasksObj(prev=> ({...prev, [newTodolist.id]: []}))
    }

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        setTasksObj(prevState =>
            ({...prevState, [todolistId]: prevState[todolistId].map(el=>el.id === taskId
                ? {...el, title}
        :el)
            }))
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(prevState => prevState.map(el=> el.id ===todolistId
        ? {...el, title}
        : el))
    }



    return (
        <div className="App">
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth={'xl'}>

                <Grid container spacing={0} sx={{ml: 2, mt: 10, p:5}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
            {
                todolists.map((tl)=>{

                    let tasksForTodolist = tasksObj[tl.id]
                    if (tl.filter === 'completed'){
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                    }
                    if (tl.filter === 'active'){
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                    }


                    return <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Paper elevation={3} sx={{padding: '10px'}}>

                        <TodoList
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
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                    /></Paper>
                </Grid>
                })
            }
                </Grid>



            </Container>
        </div>
    )
}

export default App
