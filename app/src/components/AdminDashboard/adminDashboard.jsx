import React from 'react'
import AdminLayout from './adminLayout'

const AdminDashboard = () => {
  const username = localStorage.getItem('username')
  return (
    <AdminLayout>
      <div className='flex justify-center'>
        <p className='flex text-2xl'>
          Welcome <span className='mr-1 ml-1 font-semibold'>{username}</span> to the admin
          dashboard!
        </p>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
