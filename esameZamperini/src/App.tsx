import { useState } from 'react'
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Login from './components/pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
    <BrowserRouter>
    <nav>
    <Link to={"/Home"}>Home</Link>
    <br/>
    <hr />
    <Link to={"/Login"}>Login</Link>
    <br/>
    <hr />
    <Link to={"/DashBoard}"}>DashBoard</Link>
    </nav>
    
    <Routes>
      <Route path="/Home" element={<Home/>}></Route>
      <Route path="/Login" element={<Login/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
