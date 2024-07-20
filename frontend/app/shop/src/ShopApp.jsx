import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './layout/navBar/NavBar';
import Home from './home/Home';
import Login from '../../auth/Login';

export default function ShopApp() {
  return (
    <div>
        <div>

      <NavBar />
        </div>
        <div>

      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
        </div>
    </div>

  )
}
