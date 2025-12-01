import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import mbdsLogo from './assets/mbds.jpg'

function Header() {
  return (
          <>
          <img src={mbdsLogo} alt="logo mbds" />
          <h1>Introduction à React</h1>
          <h2>A la découverte des premières notions de React</h2>
          </>
          
  )
}

function App() {
 
  return (
    <Header />
  )
}

export default App
