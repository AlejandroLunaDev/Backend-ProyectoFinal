import { Routes, Route } from 'react-router-dom';
import Navbar from './layouts/navbar/Navbar';
import AdminDashboard from './dashboard/AdminDashboard';
import Products from './products/Products';
import Categories from './categories/Categories';
import Orders from './orders/Orders';
import Users from './users/Users';
import Admins from './admins/Admins';

export default function AdminApp() {
  return (
    <div className='flex'>
      <Navbar />
      <div className='flex-1'>
        <Routes>
          <Route path='/' element={<AdminDashboard />} />
          <Route path='/dashboard' element={<AdminDashboard />} />
          <Route path='/products' element={<Products />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/admins' element={<Admins />} />
          <Route path='/users' element={<Users />} />
          {/* Otras rutas dentro de la administración */}
        </Routes>
      </div>
    </div>
  );
}
