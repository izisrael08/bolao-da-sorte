import { useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';


export default function ResultadosAdmin() {
  const [activeTab, setActiveTab] = useState('resultados');
  const [resultado, setResultado] = useState({
    data: '',
    numero: '',
    animal: '',
    premiacao: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResultado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você enviaria os dados para a API
    console.log('Resultado enviado:', resultado);
    alert('Resultado publicado com sucesso!');
    setResultado({
      data: '',
      numero: '',
      animal: '',
      premiacao: ''
    });
  };

  return (
    <div className="admin-dashboard">
      <AdminHeader />
      
      <div className="admin-content">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="admin-main">
          <h1>Publicar Resultados Atrasados</h1>
          
          <form onSubmit={handleSubmit} className="resultado-form">
            <div className="form-group">
              <label>Data do Sorteio</label>
              <input
                type="date"
                name="data"
                value={resultado.data}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Número Sorteado</label>
              <input
                type="text"
                name="numero"
                value={resultado.numero}
                onChange={handleChange}
                placeholder="Ex: 1234"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Animal</label>
              <input
                type="text"
                name="animal"
                value={resultado.animal}
                onChange={handleChange}
                placeholder="Ex: Vaca"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Premiação</label>
              <input
                type="text"
                name="premiacao"
                value={resultado.premiacao}
                onChange={handleChange}
                placeholder="Ex: R$ 1.000,00"
                required
              />
            </div>
            
            <button type="submit" className="publish-btn">
              Publicar Resultado
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}