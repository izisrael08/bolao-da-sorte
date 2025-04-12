import { useNavigate } from 'react-router-dom'; // Importe o useNavigate
import '../styles/Dashboard/index.css';

export default function Dashboard() {
    const navigate = useNavigate(); // Instancia o useNavigate

    const handleLogout = () => {
        // Aqui você pode limpar qualquer dado de autenticação, por exemplo:
        localStorage.removeItem('authToken'); // Exemplo, se você estiver usando localStorage
        sessionStorage.removeItem('authToken'); // Caso use sessionStorage
        // Redireciona para a página de login
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <div className="navbar-logo">
                    <h2>Painel de Administração do site</h2>
                </div>
                <ul className="navbar-links">
                    {/* Links de navegação podem ser adicionados aqui */}
                </ul>
                <div className="navbar-actions">
                    <button className="logout-btn" onClick={handleLogout}>Sair</button>
                </div>
            </nav>

            <div className="dashboard-content">
                <h1>Painel de Administração</h1>
                <p>Bem-vindo, admin! Aqui futuramente você poderá alterar títulos, textos, imagens, etc.</p>
            </div>
        </div>
    );
}
