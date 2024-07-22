import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './layout/navBar/NavBar';
import Home from './home/Home';
import Login from '../../auth/Login';
import UpdatePassword from '../../auth/components/UpdatePassword';
import PasswordRecovery from '../../auth/components/PaswwordRecovery';
import RegisterForm from '../../auth/components/RegisterForm';

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
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/passwordRecovery' element={<PasswordRecovery />} />
        <Route path='/resetpassword' element={<UpdatePassword />} />

      </Routes>
        </div>
    </div>

  )
}
