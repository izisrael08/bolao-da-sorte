import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PalpitesAdmin from '../pages/Components/PalpitesAdmin';
import FeaturesAdmin from '../pages/Components/FeaturesAdmin';
import ResultadosAdmin from '../pages/Components/ResultadosAdmin';
import '../pages/styles/Dashboard/index.css';

export default function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <div className="navbar-logo">
                    <h2>Painel de Administração</h2>
                </div>
                <ul className="navbar-links">
                    <li><a href="#palpites">Gerenciar Palpites</a></li>
                    <li><a href="#features">Gerenciar Features</a></li>
                    <li><a href="#resultados">Gerenciar Resultados</a></li>
                </ul>
                <div className="navbar-actions">
                    <button className="logout-btn" onClick={handleLogout}>Sair</button>
                </div>
            </nav>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            {window.location.hash === '#resultados' ? (
                <ResultadosAdmin />
            ) : window.location.hash === '#features' ? (
                <FeaturesAdmin />
            ) : (
                <PalpitesAdmin />
            )}
        </div>
    );
}