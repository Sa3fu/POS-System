import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AdminLayout from '../AdminDashboard/adminLayout'

const InventoryDetail = () => {
  const [inventoryData, setInventoryData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(13)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    // Fetch data with pagination and sorting parameters
    axios
      .get('http://localhost:8000/inventory/detail', {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          sort: 'desc', // Ensure this matches the backend sorting default
        },
      })
      .then((response) => {
        if (response.data.success) {
          setInventoryData(response.data.data)
          setTotalPages(response.data.totalPages)
        } else {
          setError('Unexpected data format')
        }
        setLoading(false)
      })
      .catch((error) => {
        setError('Error fetching inventory data')
        setLoading(false)
      })
  }, [currentPage, itemsPerPage])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  // Calculate the indices of the items to display
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = inventoryData.slice(indexOfFirstItem, indexOfLastItem)

  // Create pagination controls
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const handleClick = (number) => {
    setCurrentPage(number)
  }

  return (
    <AdminLayout>
      <div>
        <h2 className='flex text-2xl font-bold justify-center top-2 mb-10'>Inventory Details</h2>
        <table className='min-w-full border-collapse border border-gray-400 items-center flex-col'>
          <thead>
            <tr>
              <th className='border border-gray-300 p-2'>Brand</th>
              <th className='border border-gray-300 p-2'>Model</th>
              <th className='border border-gray-300 p-2'>SKU</th>
              <th className='border border-gray-300 p-2'>Category</th>
              <th className='border border-gray-300 p-2'>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr
                key={item.inventory_id}
                className={
                  item.inventory_quantity < 0
                    ? 'text-red-600'
                    : item.inventory_quantity > 0
                      ? 'text-green-600'
                      : ''
                }
              >
                <td className='border border-gray-300 p-2'>{item.product_brand}</td>
                <td className='border border-gray-300 p-2'>{item.product_model}</td>
                <td className='border border-gray-300 p-2'>{item.product_sku}</td>
                <td className='border border-gray-300 p-2'>{item.category_name}</td>
                <td className='border border-gray-300 p-2'>{item.inventory_quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex justify-center mt-4'>
          <nav>
            <ul className='flex'>
              {pageNumbers.map((number) => (
                <li key={number} className='mx-1'>
                  <button
                    onClick={() => handleClick(number)}
                    className={`px-4 py-2 border rounded ${
                      currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                    }`}
                  >
                    {number}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </AdminLayout>
  )
}

export default InventoryDetail
