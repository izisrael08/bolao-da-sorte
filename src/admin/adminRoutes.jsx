import { Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import PalpitesAdmin from './pages/PalpitesAdmin';
import ResultadosAdmin from './pages/ResultadosAdmin';
import ProtectedRoute from './ProtectedRoute';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/palpites" element={<PalpitesAdmin />} />
        <Route path="/resultados" element={<ResultadosAdmin />} />
      </Route>
    </Routes>
  );
}