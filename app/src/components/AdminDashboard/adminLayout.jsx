import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SidebarItem from '../sidebarItem/sidebarItem'
import adminImg from '../../assets/Lovepik_com-401498175-video-teaching-icon-free-vector-illustration-material.png'

const AdminLayout = ({ children }) => {
  const navigate = useNavigate()

  const username = localStorage.getItem('username')
  const role = localStorage.getItem('role')

  const handleLogout = () => {
    // Clear all relevant data from localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')

    // Redirect to login page
    navigate('/')
  }

  return (
    <div className='flex'>
      {/* Sidebar Navbar */}
      <nav className='w-64 h-screen bg-gray-800 text-white p-4 flex flex-col justify-between'>
        <div>
          <h2 className='text-2xl font-bold mb-8'>Admin Dashboard</h2>
          <div className='flex items-center'>
            <img src={adminImg} alt='Admin' className='w-14 h-14 rounded-full mb-2' />
            <div>
              <h4 className='text-sm font-bold '>{username}</h4>
              <h4 className='text-xs font-bold'>{role}</h4>
            </div>
          </div>
          <ul className='space-y-4'>
            <li>
              <Link to='/admin' className='hover:text-gray-400'>
                Dashboard
              </Link>
            </li>
            <SidebarItem
              title='Product Management'
              links={[
                { label: 'Create Product', path: '/admin/product/create' },
                { label: 'Product Detail', path: '/admin/product/detail' },
              ]}
            />
            {/* Inventory with Submenu */}
            <li>
              <SidebarItem
                title='Inventory Management'
                links={[
                  { label: 'Create Inventory', path: '/admin/inventory/create' },
                  { label: 'Inventory Details', path: '/admin/inventory/detail' },
                ]}
              />
            </li>
            <li>
              <SidebarItem
                title='User Management'
                links={[
                  { label: 'Create User', path: '/admin/user/create' },
                  { label: 'User Details', path: '/admin/user/detail' },
                ]}
              />
            </li>
            <li>
              <SidebarItem
                title='Customer Management'
                links={[
                  { label: 'Create Customer', path: '/admin/customer/create' },
                  { label: 'Customer Details', path: '/admin/customer/detail' },
                ]}
              />
            </li>
          </ul>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className='mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md'
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className='flex-1 p-8'>
        {children} {/* This renders the specific page content */}
      </div>
    </div>
  )
}

export default AdminLayout
