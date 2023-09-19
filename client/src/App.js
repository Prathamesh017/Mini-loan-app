import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home-page'
import UserPage from './pages/user-page'
import AdminPage from './pages/admin-page'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/user" element={<UserPage />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App
