// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import User_intefrace from './User_intefrace.tsx'
import { BrowserRouter } from "react-router";
import Example_interface from './Example_interface.tsx';

createRoot(document.getElementById('root')!).render(
   <BrowserRouter>
    <User_intefrace/>
    <Example_interface/>
  </BrowserRouter>,
)
