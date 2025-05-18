import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

/**
 * Pages
 */
import HomePage from './components/Main/HomePage/HomePage.jsx'
import Login from './components/Main/LoginPage/LoginPage.jsx'
import Register from './components/Main/RegisterPage/RegisterPage.jsx'
import Subjects from './components/Main/SubjectsPage/SubjectsPage.jsx'
import Levels from './components/Main/LevelsPage/LevelsPage.jsx'
import Game from './components/Main/GamePage/GamePage.jsx'
import Video from './components/Main/VideoPage/VideoPage.jsx'
import Profile from './components/Main/ProfilePage/ProfilePage.jsx'

/**
 * Router for the app
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomePage />, },
      { path: '/login', element: <Login />, },
      { path: '/register', element: <Register />, },
      { path: '/subjects', element: <Subjects />, },
      { path: '/levels', element: <Levels />, },
      { path: '/games', element: <Game />, },
      { path: '/videos', element: <Video />, },
      { path: '/profile', element: <Profile />, },
    ],
  },
])

/**
 * Render the app
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
