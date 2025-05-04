import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import './App.css'

import Signup from './pages/Signup'
import Lo from './pages/Lo'
import Dashboard from './Dashboard'

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<Lo />} />
      </Routes>
    </Router>
  )
}

export default App