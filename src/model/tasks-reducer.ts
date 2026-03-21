import type {TaskStateType} from "../App.tsx";

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

type ActionsType = RemoveTaskAT | AddTaskAT | ChangeTaskTitleAT | ChangeTaskStatusAT

export const todolistsReducer = (state: TaskStateType, action: ActionsType) : TaskStateType => {
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
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}


export const addTodolistAC = (todolistID: string, title: string) => {
    return {type: 'ADD-TASK', todolistID, title}
}

export const changeTitleAC = (todolistID: string, taskID: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistID, taskID, title}
}

export const changeFilter = (   taskID: string, isDone: boolean, todolistID: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskID, isDone, todolistID}
}
