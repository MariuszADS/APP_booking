import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import RegisterForm from './RegisterForm';
import './index.css'
import LoginForm from './LoginForm';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <RegisterForm />
    <LoginForm/>
  </BrowserRouter>,
)
