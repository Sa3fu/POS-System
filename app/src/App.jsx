import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Auth/login'
import Register from './components/Auth/register'
import PrivateRoute from './components/Auth/privateRoute'
import AdminDashboard from './components/AdminDashboard/adminDashboard'
import CashierDashboard from './components/CashierDashboard/cashierDashboard'
import InventoryDetail from './components/Inventory/inventorydetail'

function app() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin' element={<PrivateRoute element={AdminDashboard} role='admin' />} />
        <Route
          path='/cashier'
          element={<PrivateRoute element={CashierDashboard} role='cashier' />}
        />
        <Route path='/admin/inventory/detail' element={<InventoryDetail />} role='admin' />
      </Routes>
    </Router>
  )
}

export default app
