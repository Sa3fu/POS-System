import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AdminLayout from '../AdminDashboard/adminLayout'
import Table from '../Table/table'

const ProductDetail = () => {
  const [inventoryData, setInventoryData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(13)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    axios
      .get('http://localhost:8000/product/detail', {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          sort: 'desc',
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

  const columns = [
    { header: 'Brand', accessor: 'product_brand' },
    { header: 'Model', accessor: 'product_model' },
    { header: 'SKU', accessor: 'product_sku' },
    { header: 'Barcode', accessor: 'product_barcode' },
    { header: 'Category', accessor: 'category_name' },
    { header: 'Price', accessor: 'product_price' },
    { header: 'Quantity', accessor: 'quantitySum' },
    {
      header: 'Enabled',
      accessor: 'product_isEnabled',
      render: (item) => (item.product_isEnabled === 1 ? 'true' : 'false'),
    },
    {
      header: 'Deleted',
      accessor: 'product_isDeleted',
      render: (item) => (item.product_isDeleted === 1 ? 'true' : 'false'),
    },
  ]

  // Pagination controls
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
        <h2 className='flex text-2xl font-bold justify-center top-2 mb-10'>Product Details</h2>

        {/* Pass the inventory data and columns to the Table */}
        <Table columns={columns} data={inventoryData} />

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

export default ProductDetail
