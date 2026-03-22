import {addTodolistAC, todolistsReducer} from './todolists-reducer';
import { v1 } from 'uuid';
import {type FilterValuesType, type TaskStateType, type TodolistType} from '../App';
import {addTaskAC, tasksReducer} from "./tasks-reducer.ts";

test('correct todolist should be removed', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]

    const endState = todolistsReducer(startState, { type: 'REMOVE-TODOLIST', todolistID: todolistId1 })

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('new todolist should be added', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]

    const newTitle = 'NewTodolist'
    const action = addTodolistAC(newTitle)

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTitle);
});

test(' todolist should change its name', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

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
    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]

    const newFilter: FilterValuesType= 'completed'


    const endState = todolistsReducer(startState, { type: 'CHANGE-FILTER', filter: newFilter, id: todolistId2})

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe(newFilter);
});

test('new task was added', ()=>{

    const todolistId1 = v1();
    const todolistId2 = v1();
    const taskID1 = v1()
    const taskID2 = v1()
    const taskID3 = v1()
    const taskID4 = v1()
    const taskID5 = v1()

    const startState: TaskStateType = {
        [todolistId1]: [
            {id: taskID1, title: 'Css', isDone: true},
            {id: taskID2, title: 'JS', isDone: true},
            {id: taskID3, title: 'react', isDone: false},
        ],
        [todolistId2]: [
            {id: taskID4, title: 'milk', isDone: true},
            {id: taskID5, title: 'bread', isDone: false},

        ]
    }

    const action = addTaskAC(todolistId1, 'Ridax')
    const endState = tasksReducer(startState, action)

    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId1][3].title).toBeDefined()
    expect(endState[todolistId1][3].title).toBe('Ridax')
    expect(endState[todolistId1][3].isDone).toBe(false)
})


test('an empty array should be added when a new todolist is added', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();
    const taskID1 = v1()
    const taskID2 = v1()
    const taskID3 = v1()
    const taskID4 = v1()
    const taskID5 = v1()

    const startState: TaskStateType = {
        [todolistId1]: [
            {id: taskID1, title: 'Css', isDone: true},
            {id: taskID2, title: 'JS', isDone: true},
            {id: taskID3, title: 'react', isDone: false},
        ],
        [todolistId2]: [
            {id: taskID4, title: 'milk', isDone: true},
            {id: taskID5, title: 'bread', isDone: false},

        ]}

    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)

    expect(endState[action.todolistID]).toBeDefined();
    expect(endState[action.todolistID].length).toBe(0);
});