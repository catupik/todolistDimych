import type {FilterValuesType, TodolistType} from "../App.tsx";
import {v1} from "uuid";


type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST',
    id: string
}

type AddTodolistAT = {
    type: 'ADD-TODOLIST',
    title: string
}

type ChangeTitleAT = {
    type: 'CHANGE-TITLE',
    id: string,
    title: string
}

type ChangeFilterAT = {
    type: 'CHANGE-FILTER',
    id: string,
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistAT | AddTodolistAT | ChangeTitleAT | ChangeFilterAT

export const todolistsReducer = (state: TodolistType[], action: ActionsType) : TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el=> el.id !== action.id )
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        case 'CHANGE-TITLE':
            return state.map(el=> el.id === action.id ? {...el, title: action.title} : el)
        case 'CHANGE-FILTER':
            return state.map(el=> el.id===action.id ? {...el, filter: action.filter} : el)
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}


export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title}
}

export const changeTitleAC = (todolistID: string, title: string) => {
    return {type: 'CHANGE-TITLE', id: todolistID, title}
}

export const changeFilter = (todolistID: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-FILTER', id: todolistID, filter}
}
