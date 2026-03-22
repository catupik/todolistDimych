import type {TaskStateType} from "../App.tsx";
import {type AddTodolistAT, type RemoveTodolistAT} from './todolists-reducer.ts'

import {v1} from "uuid";


type RemoveTaskAT = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}

type AddTaskAT = {
    type: 'ADD-TASK',
    todolistID: string,
    title: string
}

type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE',
    todolistID: string,
    taskID: string,
    title: string
}

type ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS',

    taskID: string,
    isDone: boolean,
    todolistID: string
}

type ActionsType = RemoveTaskAT
    | AddTaskAT
    | ChangeTaskTitleAT
    | ChangeTaskStatusAT
    |  AddTodolistAT
    | RemoveTodolistAT

export const tasksReducer = (state: TaskStateType, action: ActionsType) : TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].
                filter(el=>el.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {... state, [action.todolistID]:
                    [...state[action.todolistID], {id: v1(), title: action.title, isDone: false}]}
        case 'CHANGE-TASK-TITLE':
            return {...state, [action.todolistID]: state[action.todolistID].
                map(el=> el.id === action.taskID
                    ? {...el, title: action.title}
                    : el
                )
        }
        case 'CHANGE-TASK-STATUS':
            return {...state, [action.todolistID]: state[action.todolistID].
                map(el => el.id ===action.taskID
                ? {...el, isDone: action.isDone}
                    : el
                )}
        case 'ADD-TODOLIST':
            return {...state, [action.todolistID]: []}
        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.todolistID]
            return copyState}
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskAT => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}


export const addTaskAC = (todolistID: string, title: string): AddTaskAT => {
    return {type: 'ADD-TASK', todolistID, title}
}

export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string):ChangeTaskTitleAT  => {
    return {type: 'CHANGE-TASK-TITLE', todolistID, taskID, title}
}

export const changeTaskStatusAC = (   taskID: string, isDone: boolean, todolistID: string): ChangeTaskStatusAT => {
    return {type: 'CHANGE-TASK-STATUS', taskID, isDone, todolistID}
}
