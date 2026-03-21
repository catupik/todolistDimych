import { todolistsReducer } from './todolists-reducer';
import { v1 } from 'uuid';
import {type FilterValuesType, type TodolistType} from '../App';

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]

    const endState = todolistsReducer(startState, { type: 'REMOVE-TODOLIST', id: todolistId1 })

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('new todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]

    const newTitle = 'NewTodolist'

    const endState = todolistsReducer(startState, { type: 'ADD-TODOLIST', title: newTitle })

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTitle);
});

test(' todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]

    const newTitle = 'newTitle'


    const endState = todolistsReducer(startState, { type: 'CHANGE-TITLE', title: newTitle, id: todolistId2})

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe(newTitle);
});

test(' correct filter should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]

    const newFilter: FilterValuesType= 'completed'


    const endState = todolistsReducer(startState, { type: 'CHANGE-FILTER', filter: newFilter, id: todolistId2})

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe(newFilter);
});