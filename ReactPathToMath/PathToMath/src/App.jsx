import React from 'react';
import './App.css';
import Header from './components/header/header';
import { GradeProvider } from './components/Utils/GradeComponent';
import { LoginStatusProvider } from './components/Utils/LoginStatusComponent';
import Footer from './components/footer/footer';
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <LoginStatusProvider>
      <GradeProvider>
        <div className="flex flex-col relative">
          {/* Header - Fixed position at top */}
          <header className="sticky top-0 z-10 w-full bg-white">
            <Header />
          </header>

          {/* Main Content - with appropriate padding/margin */}
          <main className="flex-grow w-full pt-4 background-image">
            <Outlet />
          </main>

          {/* Footer */}
          <footer className="w-full bg-white ">
            <Footer />
          </footer>
        </div>
      </GradeProvider>
    </LoginStatusProvider>
  );
}

export default App;