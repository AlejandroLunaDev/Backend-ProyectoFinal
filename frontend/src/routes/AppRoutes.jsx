import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AdminApp from "../admin/AdminApp";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin/*' element={<AdminApp />} />
        {/* Otras rutas principales aquí */}
      </Routes>
    </BrowserRouter>
  );
}

