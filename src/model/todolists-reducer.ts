import type {TodolistType} from "../App.tsx";
import {v1} from "uuid";


type ActionType = {
    type: string
    [key: string]: any

}
export const todolistsReducer = (state: TodolistType[], action: ActionType) : TodolistType[] => {
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