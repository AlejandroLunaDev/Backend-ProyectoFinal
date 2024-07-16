import { GoHome } from 'react-icons/go';
import { AiOutlineProduct } from 'react-icons/ai';
import { IoIosList } from 'react-icons/io';
import { BsBorderStyle } from 'react-icons/bs';
import { GrUserAdmin } from 'react-icons/gr';
import { HiOutlineUsers } from 'react-icons/hi2';
import { IoLogOutOutline } from 'react-icons/io5';

import { NavLink } from 'react-router-dom';

const navItems = [
  { to: 'dashboard', icon: <GoHome />, label: 'Dashboard' },
  { to: 'products', icon: <AiOutlineProduct />, label: 'Products' },
  { to: 'categories', icon: <IoIosList />, label: 'Categories' },
  { to: 'orders', icon: <BsBorderStyle />, label: 'Orders' },
  { to: 'admins', icon: <GrUserAdmin />, label: 'Admins' },
  { to: 'users', icon: <HiOutlineUsers />, label: 'Users' },
];

export default function ListNav() {
  return (
    <ul className='h-dvh flex flex-col gap-3 px-4 text-[1.5rem] text-gray-600'>
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          className='flex items-center gap-2 hover:bg-orange-300 focus:text-orange-600' 
        >
          {item.icon}
          {item.label}
        </NavLink>
      ))}
      <li className='flex items-center gap-1 cursor-pointer'>
        <IoLogOutOutline /> Logout
      </li>
    </ul>
  );
}
