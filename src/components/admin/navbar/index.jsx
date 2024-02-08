import React from 'react'
import { selName } from '../../../redux/slices/authSlice'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const adminName=useSelector(selName);
  return (
    <div className='d-flex flex-col items-center justify-center shadow p-4 w-[20%]'>
<span>{adminName}</span>
<nav>
  <ul>
    <li className='mb-3'>
      <Link to="all-product">All product</Link>
    </li>
    <li className='mb-3'>
      <Link to="add-product">Add product</Link>
    </li>
    <li className='mb-3'>
      <Link to="orders">Orders</Link>
    </li>
  </ul>
</nav>
    </div>
  )
}

export default Navbar