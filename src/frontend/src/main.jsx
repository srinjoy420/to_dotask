import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter,Routes,Route } from "react-router";
import Login from './components/Login.jsx';
import Singup from './components/SingUp.jsx';
import Getme from './components/getme.jsx';
import Logout from './components/logout.jsx';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<Login />} />
        <Route path='/singup' element={<Singup />} />
        <Route path='/getme' element={<Getme />} />
        <Route path='/logout' element={<Logout />} />
        
        
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
