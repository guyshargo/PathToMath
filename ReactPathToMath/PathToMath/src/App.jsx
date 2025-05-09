import React from 'react';
import './App.css';
import Header from './components/header/header';
import { GradeProvider } from './components/Utils/GradeComponent';
import { LoginStatusProvider } from './components/Utils/LoginStatusComponent';
import Footer from './components/footer/footer';
import HomePage from './components/Main/HomePage/HomePage';

function App() {
  return (
    <LoginStatusProvider>
      <GradeProvider>
        <div className="flex flex-col min-h-screen overflow-x-hidden">
          {/* Header - Fixed height */}
          <header className="flex-none h-[15vh]">
            <Header />
          </header>

          {/* Main Content */}
          <main className="main-container flex-grow">
            <HomePage />
          </main>

          {/* Footer - Fixed height */}
          <footer className="flex-none h-[10vh]">
            <Footer />
          </footer>
        </div>
      </GradeProvider>
    </LoginStatusProvider>
  );
}

export default App;
