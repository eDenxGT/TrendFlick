import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/auth/RegisterPage'
import Login from './pages/auth/LoginPage'
import { PublicRoute } from './utils/protectors/PublicRoute'
import { ProtectedRoute } from './utils/protectors/ProtectedRoute'
import Feed from './pages/user/Feed'
import Settings from './pages/user/Settings'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<PublicRoute element={<Register />} />} />
        <Route path="/login" element={<PublicRoute element={<Login />} />} />

        {/* Protected Routes */}
        <Route path="/feed" element={<ProtectedRoute element={<Feed />} />} />
        <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
      </Routes>
    </Router>
  )
}

export default App
