import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import "../../styles/admin/AdminDashboard.css";


export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar autenticação
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      <AdminHeader onLogout={handleLogout} />
      
      <div className="admin-content">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="admin-main">
          <h1>Dashboard</h1>
          
          <div className="stats-cards">
            <div className="stat-card">
              <h3>Palpites Cadastrados</h3>
              <p>24</p>
            </div>
            
            <div className="stat-card">
              <h3>Resultados Publicados</h3>
              <p>15</p>
            </div>
            
            <div className="stat-card">
              <h3>Usuários Ativos</h3>
              <p>128</p>
            </div>
          </div>
          
          <div className="quick-actions">
            <h2>Ações Rápidas</h2>
            <div className="action-buttons">
              <button onClick={() => setActiveTab('palpites')}>
                Adicionar Palpites
              </button>
              <button onClick={() => setActiveTab('resultados')}>
                Publicar Resultados
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}