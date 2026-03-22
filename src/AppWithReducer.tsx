import './App.css'
import {type TaskType, TodoList} from "./TodoList.tsx";
import { useReducer} from "react";
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
import {
    addTodolistAC,
    changeFilterAC,
    changeTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./model/tasks-reducer.ts";


export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}

export type TaskStateType = {
    [key: string]: TaskType[]
}

function AppWithReducer() {


    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ])

    const [tasksObj, dispatchTotasks] = useReducer(tasksReducer, {
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

        dispatchTodolists(removeTodolistAC(todolistId))

    }


    const removeTask = (taskId: string, todolistId: string) => {
       dispatchTotasks(removeTaskAC( todolistId, taskId))
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        dispatchTodolists(changeFilterAC( todolistId , value))
    }

    const addTask = (newTitle: string, todolistId: string) => {

        dispatchTotasks(addTaskAC(todolistId, newTitle))
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
       dispatchTotasks(changeTaskStatusAC(taskId,isDone, todolistId))
    }

    const addTodolist = (title: string)=> {
        const action = addTodolistAC(title)
        dispatchTodolists(action)
        dispatchTotasks(action)
    }

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        dispatchTotasks(changeTaskTitleAC(todolistId,  taskId, title))
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchTodolists(changeTitleAC(todolistId, title))
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


                    return <Grid >
                        <Paper elevation={3} sx={{padding: '10px',width: '300px'}}>

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

export default AppWithReducer
