export default function AdminHeader({ onLogout }) {
    return (
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>Bolão da Sorte - Admin</h1>
          <button onClick={onLogout} className="logout-btn">
            Sair
          </button>
        </div>
      </header>
    );
  }