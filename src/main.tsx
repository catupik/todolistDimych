//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'
import AppWithReducer from "./AppWithReducer.tsx";

createRoot(document.getElementById('root')!).render(

    <AppWithReducer />

)
