import React from 'react'
import { Navigate } from 'react-router-dom'

// Helper function to check if the user is authenticated and has a required role
const isAuthenticated = (requiredRole) => {
  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('role') // Get the role from localStorage

  if (!token) return false // If no token, the user is not authenticated

  if (requiredRole && requiredRole !== userRole) {
    // If a role is required and doesn't match the user's role, deny access
    return false
  }

  return true // User is authenticated and has the required role (if any)
}

const PrivateRoute = ({ element: Element, role, ...rest }) => {
  // If the user is authenticated and has the required role, render the component
  return isAuthenticated(role) ? <Element {...rest} /> : <Navigate to='/' />
}

export default PrivateRoute
