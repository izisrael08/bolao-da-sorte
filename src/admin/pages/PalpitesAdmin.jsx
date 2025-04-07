import { useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import "../../styles/admin/AdminPages.css";

export default function PalpitesAdmin() {
  const [activeTab, setActiveTab] = useState('palpites');
  const [palpites, setPalpites] = useState({
    segunda: ['', '', '', ''],
    terca: ['', '', '', ''],
    quarta: ['', '', '', ''],
    quinta: ['', '', '', ''],
    sexta: ['', '', '', ''],
    sabado: ['', '', '', ''],
    domingo: ['', '', '', '']
  });

  const handleChange = (dia, index, value) => {
    setPalpites(prev => ({
      ...prev,
      [dia]: prev[dia].map((num, i) => i === index ? value : num)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você enviaria os dados para a API
    console.log('Palpites enviados:', palpites);
    alert('Palpites atualizados com sucesso!');
  };

  return (
    <div className="admin-dashboard">
      <AdminHeader />
      
      <div className="admin-content">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="admin-main">
          <h1>Gerenciar Palpites da Semana</h1>
          
          <form onSubmit={handleSubmit} className="palpites-form">
            {Object.entries(palpites).map(([dia, numeros]) => (
              <div key={dia} className="dia-palpite">
                <h3>{dia.charAt(0).toUpperCase() + dia.slice(1)}-feira</h3>
                <div className="numeros-inputs">
                  {numeros.map((num, index) => (
                    <input
                      key={index}
                      type="text"
                      value={num}
                      onChange={(e) => handleChange(dia, index, e.target.value)}
                      placeholder="Número"
                      maxLength="2"
                    />
                  ))}
                </div>
              </div>
            ))}
            
            <button type="submit" className="save-btn">
              Salvar Palpites
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}