import  { useState } from 'react';
import RegisterForm from './components/RegisterForm';
import { FaEye, FaEyeSlash, FaGithub } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc"; // Importa los íconos de GitHub y Google

import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from './hook/useAuth';

export default function Login() {
  /* const {  loginWithGitHub, loginWithGoogle } = useContext(AuthContext); */
  const {login,loginWithGitHub,loginWithGoogle}=useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const credentials = { email, password };
         await login(credentials);
     
    } catch (error) {
        console.error('Login error:', error);
        setError('Usuario o contraseña incorrectos');
    } finally {
        setLoading(false);
    }
};



  const handleRegister = () => {
    setShowRegister(true);
  };

  const handleLoginWithGitHub = async () => {
    setLoading(true);
    try {
      await loginWithGitHub();
    } catch (error) {
      setError('Error al iniciar sesión con GitHub');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (error) {
      setError('Error al iniciar sesión con Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='w-full h-screen flex justify-center items-center'>

    <div className="bg-white shadow-lg p-8  rounded-lg w-2/4 h-3/4 flex flex-col justify-center  ">
      {showRegister ? (
        <RegisterForm onClose={() => setShowRegister(false)} />
      ) : (
        <>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <h2 className="text-2xl font-semibold mb-4">Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico:</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#61005D] focus:border-[#61005D] sm:text-sm" />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className=" text-sm font-medium text-gray-700 flex justify-between">
                Contraseña:
              </label>
              <div className='relative'>

              <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className=" mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#61005D] focus:border-[#61005D] sm:text-sm" />
              <div className='absolute top-1/2 right-3 -translate-y-1/2'>
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(false)} className="  cursor-pointer text-gray-500" />
                ) : (
                  <FaEye onClick={() => setShowPassword(true)} className="cursor-pointer text-gray-500" />
                )}
              </div>
              </div>
            </div>
            <button type="submit" className="w-full bg-[#61005D] text-white py-2 px-4 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Iniciar Sesión'}
            </button>
            <p className="text-center mt-4">¿No tienes una cuenta? <span className="text-[#61005D] font-semibold cursor-pointer" onClick={handleRegister}>Regístrate aquí</span></p>
            <div className="flex justify-between gap-3 mt-4">
              <button
                type="button"
                className="w-1/2 flex items-center justify-evenly border border-[#61005D]  text-black py-2 px-4 rounded-md  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                onClick={handleLoginWithGitHub}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : <><FaGithub className="mr-2 h-7 w-7" /> GitHub</>}
              </button>
              <button
                type="button"
                className="w-1/2 flex items-center justify-evenly border border-[#61005D]   text-black py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#61005D] focus:ring-opacity-50"
                onClick={handleLoginWithGoogle}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : <><FcGoogle className="mr-2 h-7 w-7" />Google</>}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
    </section>
  );
}

