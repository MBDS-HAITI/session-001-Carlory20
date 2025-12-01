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

function MainContent() {
  return (
    <p>
      Ici, nous afficherons des informations interessantes :) 
    </p>
  )
}

function Footer() {
  return (
    <footer>
      <p>Tous droits réservés - El. Carlo</p>
    </footer>
  )
}

function App() {
 
  return (
    <>
      <Header />
      <MainContent />
      <Footer />
    </>
  )
}

export default App
