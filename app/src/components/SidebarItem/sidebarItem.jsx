import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SidebarItem = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      {/* Main menu item with arrow */}
      <button
        onClick={toggleMenu}
        className='w-full text-left flex items-center justify-between hover:text-gray-400 focus:outline-none'
      >
        {title}
        <span className={`transform ${isOpen ? 'rotate-90' : ''}`}>
          &#x25B6; {/* Right arrow */}
        </span>
      </button>

      {/* Submenu, shown conditionally */}
      {isOpen && (
        <ul className='ml-6 mt-2 space-y-2'>
          {links.map((link, index) => (
            <li key={index} className='text-sm'>
              <Link to={link.path} className='hover:text-gray-400'>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SidebarItem
