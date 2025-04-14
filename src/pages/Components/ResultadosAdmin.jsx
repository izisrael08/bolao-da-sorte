import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/api';
import '../styles/Dashboard/Resultados/index.css';

export default function ResultadosAdmin() {
    const [resultados, setResultados] = useState([]);
    const [novoResultado, setNovoResultado] = useState({
        data: '',
        numeros: ['', '', '']
    });
    const [editingId, setEditingId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const showSuccess = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    const showError = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    useEffect(() => {
        carregarResultados();
    }, []);

    const carregarResultados = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/api/resultados');
            if (response.data.success) {
                setResultados(response.data.data);
            }
        } catch (error) {
            console.error("Erro ao carregar resultados:", error);
            showError("Erro ao carregar resultados");
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoResultado(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNumeroChange = (index, value) => {
        const novosNumeros = [...novoResultado.numeros];
        novosNumeros[index] = value;
        setNovoResultado(prev => ({
            ...prev,
            numeros: novosNumeros
        }));
    };

    const handleEdit = (resultado) => {
        setNovoResultado({
            data: resultado.data,
            numeros: [...resultado.numeros]
        });
        setEditingId(resultado._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este resultado?')) return;
        
        try {
            await api.delete(`/api/resultados/${id}`);
            carregarResultados();
            showSuccess("Resultado excluído com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar resultado:", error);
            showError("Erro ao deletar resultado");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!novoResultado.data || novoResultado.numeros.some(num => !num)) {
            showError("Preencha todos os campos");
            return;
        }

        try {
            const resultadoData = {
                data: novoResultado.data,
                numeros: novoResultado.numeros
            };

            if (editingId) {
                await api.put(`/api/resultados/${editingId}`, resultadoData);
                showSuccess("Resultado atualizado com sucesso!");
            } else {
                await api.post('/api/resultados', resultadoData);
                showSuccess("Resultado criado com sucesso!");
            }
            
            carregarResultados();
            setNovoResultado({
                data: '',
                numeros: ['', '', '']
            });
            setEditingId(null);
        } catch (error) {
            console.error("Erro ao salvar resultado:", error);
            showError(error.response?.data?.error || "Erro ao salvar resultado");
        }
    };

    return (
        <div className="resultados-admin-container">
            <ToastContainer />
            
            <h1>Gerenciamento de Resultados</h1>
            <p>Adicione ou edite os resultados atrasados do Jogo do Bicho</p>
            
            <form onSubmit={handleSubmit} className="resultados-form">
                <div className="form-group">
                    <label>Data (DD/MM/AAAA):</label>
                    <input
                        type="text"
                        name="data"
                        value={novoResultado.data}
                        onChange={handleInputChange}
                        placeholder="Ex: 01/01/2023"
                        required
                        pattern="\d{2}/\d{2}/\d{4}"
                        title="Digite a data no formato DD/MM/AAAA"
                    />
                </div>
                
                <div className="form-group">
                    <label>Número Sorteado:</label>
                    <input
                        type="text"
                        value={novoResultado.numeros[0]}
                        onChange={(e) => handleNumeroChange(0, e.target.value)}
                        placeholder="Número (Ex: 1234)"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Animal:</label>
                    <input
                        type="text"
                        value={novoResultado.numeros[1]}
                        onChange={(e) => handleNumeroChange(1, e.target.value)}
                        placeholder="Animal (Ex: Vaca)"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Premiação:</label>
                    <input
                        type="text"
                        value={novoResultado.numeros[2]}
                        onChange={(e) => handleNumeroChange(2, e.target.value)}
                        placeholder="Premiação (Ex: R$ 1.000,00)"
                        required
                    />
                </div>
                
                <div className="form-buttons">
                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="spinner"></span>
                        ) : (
                            editingId ? 'Atualizar' : 'Salvar'
                        )}
                    </button>
                    
                    {editingId && (
                        <button 
                            type="button" 
                            className="cancel-btn"
                            onClick={() => {
                                setNovoResultado({
                                    data: '',
                                    numeros: ['', '', '']
                                });
                                setEditingId(null);
                            }}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <div className="resultados-list">
                <h2>Resultados Cadastrados</h2>
                
                {isLoading ? (
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <p>Carregando resultados...</p>
                    </div>
                ) : resultados.length === 0 ? (
                    <p className="no-items">Nenhum resultado cadastrado ainda</p>
                ) : (
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Número</th>
                                    <th>Animal</th>
                                    <th>Premiação</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultados.map(resultado => (
                                    <tr key={resultado._id}>
                                        <td>{resultado.data}</td>
                                        <td>{resultado.numeros[0]}</td>
                                        <td>{resultado.numeros[1]}</td>
                                        <td>{resultado.numeros[2]}</td>
                                        <td className="actions-cell">
                                            <button 
                                                className="edit-btn"
                                                onClick={() => handleEdit(resultado)}
                                                disabled={isLoading}
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                className="delete-btn"
                                                onClick={() => handleDelete(resultado._id)}
                                                disabled={isLoading}
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}