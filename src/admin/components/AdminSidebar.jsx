import { NavLink } from 'react-router-dom';

export default function AdminSidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="admin-sidebar">
      <nav>
        <ul>
          <li>
            <NavLink 
              to="/admin/dashboard" 
              className={activeTab === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/palpites" 
              className={activeTab === 'palpites' ? 'active' : ''}
              onClick={() => setActiveTab('palpites')}
            >
              Gerenciar Palpites
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/resultados" 
              className={activeTab === 'resultados' ? 'active' : ''}
              onClick={() => setActiveTab('resultados')}
            >
              Gerenciar Resultados
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}