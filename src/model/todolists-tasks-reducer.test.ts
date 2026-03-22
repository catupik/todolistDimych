import type {TaskStateType, TodolistType} from "../App.tsx";
import {addTodolistAC, todolistsReducer} from "./todolists-reducer.ts";
import {tasksReducer} from "./tasks-reducer.ts";



test('ids should be equal', ()=>{
    const startTasksState: TaskStateType = {}
    const startTodolistType: Array<TodolistType> = []

    const action = addTodolistAC('new todolist')
    const endTasksState = tasksReducer(startTasksState, action)
    const endsTodolistState = todolistsReducer(startTodolistType, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolist  = endsTodolistState[0].id

    expect(idFromTasks).toBe(action.todolistID)
    expect(idFromTodolist).toBe(action.todolistID)
})