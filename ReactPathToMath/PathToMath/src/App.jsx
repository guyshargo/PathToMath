import React from 'react';
import './App.css'
import { useState } from 'react';
import Header from './components/header/header'
import { GradeProvider } from './components/Main/GradeComponent';

function App() {
  //login status
  const [isLoggedIn, setIsLoggedIn] = useState(false); // default: not logged in

  return (
    <GradeProvider>
    <div className="app">
      <Header isLoggedIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn}/>
    </div>
    </GradeProvider>
  )
}
export default App