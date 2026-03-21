// import { userReducer} from './user-reducer.ts'
// import {expect} from "vitest";
//
//
// test("user reducer",  () => {
//     const initialState = {age: 20, childrenCount: 1, name: 'Kate'}
//     const endState = userReducer(initialState, {type: 'INCREMENT_AGE'})
//
//     expect(endState.age).toBe(21)
//     expect(endState.childrenCount).toBe(1)
//
// })
//
// test("user reducer, only childrenCount increments",  () => {
//     const initialState = {age: 20, childrenCount: 1, name: 'Kate'}
//     const endState = userReducer(initialState, {type: 'INCREMENT_CH'})
//
//     expect(endState.age).toBe(20)
//     expect(endState.childrenCount).toBe(2)
//
// })
//
// test("user reducer, user name is changed",  () => {
//
//     const newName = "Kate G"
//     const initialState = {age: 20, childrenCount: 1, name: 'Kate'}
//     const endState = userReducer(initialState, {type: 'CHANGE_NAME', name: newName})
//
//
//     expect(endState.name).toBe("Kate G")
//     expect(endState.childrenCount).toBe(1)
//     expect(endState.age).toBe(20)
//
// })