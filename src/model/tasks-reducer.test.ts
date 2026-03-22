import { tasksReducer } from './tasks-reducer.ts'
import { v1 } from 'uuid';
import type {TaskStateType} from "../App.tsx";
import {removeTodolistAC} from "./todolists-reducer.ts";


test('correct task should be removed', () => {
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

    const endState = tasksReducer(startState, { type: 'REMOVE-TASK', taskId: taskID1, todolistId: todolistId1 })

    expect(endState[todolistId1].length).toBe(2);
    expect(endState[todolistId1][0].id).toBe(taskID2);
});


    test('new task should be added', () => {
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

        const endState = tasksReducer(startState,
            {type: 'ADD-TASK', todolistID: todolistId2, title: "new title"})

        expect(endState[todolistId2].length).toBe(3);
        expect(endState[todolistId2][2].title).toBe("new title");

    });

test('task title should be changed correctly', () => {
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
    const endState = tasksReducer(startState, { type: 'CHANGE-TASK-TITLE', todolistID:todolistId1, taskID: taskID3 ,title: "Ridax" })

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId1][2].title).toBe("Ridax" )

})

test('status should be changed correctly', () => {
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




    const endState = tasksReducer(startState, { type: 'CHANGE-TASK-STATUS', taskID: taskID4, isDone: false, todolistID: todolistId2})


    expect(endState[todolistId2][0].isDone).toBe(false);
});


test('property with todolistId should be deleted', ()=> {
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

    const action = removeTodolistAC(todolistId1)
    const endState = tasksReducer(startState, action)

    expect(Object.keys(endState).length).toBe(1);
    expect(endState[todolistId1]).not.toBeDefined()
    expect(endState[todolistId2]).toBeDefined()
})

