import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

/**
 * Pages
 */
import HomePage from './components/Main/HomePage/HomePage.jsx'
import LoginSignup from './components/Main/LoginSignupPage/LoginSignup.jsx'
import SubjectsPage from './components/Main/SubjectsPage/SubjectsPage.jsx'
import LevelsPage from './components/Main/LevelsPage/LevelsPage.jsx'
import Game from './components/Main/Games/RaceGame/RaceGame.jsx'
import VideoPage from './components/Main/VideoPage/VideoPage.jsx'
import Profile from './components/Main/ProfilePage/ProfilePage.jsx'
import RelevantVideo from './components/Main/VideoPage/RelevantVideo.jsx'

/**
 * Router for the app
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomePage />, },
      { path: '/login', element: <LoginSignup action="Login" />, },
      { path: '/signup', element: <LoginSignup action="Signup" />, },
      { path: '/subjects', element: <SubjectsPage />, },
      { path: '/subjects/:subjectGame', element: <LevelsPage />, },
      { path: '/:subjectGame/play', element: <Game />, },
      { path: '/videos', element: <VideoPage />, },
      { path: '/videos/:subject', element: <RelevantVideo />, },
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
