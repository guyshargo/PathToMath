import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css'
import { useState } from 'react'
import Header from './components/header/header'
import { GradeProvider } from './components/Main/GradeComponent'
import { SubjectProvider } from './components/Main/SubjectComponent'
import { LoginStatusProvider } from "./components/Main/LoginStatusComponent"
import Footer from './components/footer/Footer'
import MathSubjectsComponent from './components/math_subjects/MathSubjectsComponent'
import GameLevel from './components/game_level/GameLevel'

function App() {
  return (
    <LoginStatusProvider>
      <GradeProvider>
        <SubjectProvider>
          <Router>
            <div className="app">
              <Header />
              <Routes>
                <Route path="/" element={<MathSubjectsComponent />} />
                <Route path="/gameLevel" element={<GameLevel />} />
              </Routes>
              <Footer />
            </div>
          </Router>
        </SubjectProvider>
      </GradeProvider>
    </LoginStatusProvider>
  );
}

export default App