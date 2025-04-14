import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/api';
import '../../pages/styles/Dashboard/Features/index.css';

export default function FeaturesAdmin() {
    const [features, setFeatures] = useState([]);
    const [novaFeature, setNovaFeature] = useState({
        titulo: '',
        descricao: '',
        ordem: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Configuração do Toast
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
        carregarFeatures();
    }, []);

    const carregarFeatures = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/api/features');
            setFeatures(response.data.data || []);
        } catch (error) {
            console.error("Erro ao carregar features:", error);
            showError("Erro ao carregar features");
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovaFeature(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEdit = (feature) => {
        setNovaFeature({
            titulo: feature.titulo,
            descricao: feature.descricao,
            ordem: feature.ordem.toString()
        });
        setEditingId(feature._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir esta feature?')) return;
        
        try {
            await api.delete(`/api/features/${id}`);
            carregarFeatures();
            showSuccess("Feature excluída com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar feature:", error);
            showError("Erro ao deletar feature");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!novaFeature.titulo || !novaFeature.descricao || !novaFeature.ordem) {
            showError("Preencha todos os campos");
            return;
        }

        try {
            const featureData = {
                titulo: novaFeature.titulo,
                descricao: novaFeature.descricao,
                ordem: parseInt(novaFeature.ordem)
            };

            if (editingId) {
                await api.put(`/api/features/${editingId}`, featureData);
                showSuccess("Feature atualizada com sucesso!");
            } else {
                await api.post('/api/features', featureData);
                showSuccess("Feature criada com sucesso!");
            }
            
            carregarFeatures();
            setNovaFeature({ titulo: '', descricao: '', ordem: '' });
            setEditingId(null);
        } catch (error) {
            console.error("Erro ao salvar feature:", error);
            showError(error.response?.data?.error || "Erro ao salvar feature");
        }
    };

    return (
        <div className="admin-container">
            <ToastContainer />
            
            <h1>Gerenciamento de Features</h1>
            <p>Adicione ou edite os passos de "Como Participar" que aparecem na página inicial</p>
            
            <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-group">
                    <label>Título:</label>
                    <input
                        type="text"
                        name="titulo"
                        value={novaFeature.titulo}
                        onChange={handleInputChange}
                        placeholder="Ex: Primeiro Passo"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Descrição:</label>
                    <textarea
                        name="descricao"
                        value={novaFeature.descricao}
                        onChange={handleInputChange}
                        placeholder="Ex: Registre-se na plataforma para começar"
                        required
                        rows="3"
                    />
                </div>
                
                <div className="form-group">
                    <label>Ordem:</label>
                    <input
                        type="number"
                        name="ordem"
                        value={novaFeature.ordem}
                        onChange={handleInputChange}
                        placeholder="Número da ordem de exibição"
                        min="1"
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
                                setNovaFeature({ titulo: '', descricao: '', ordem: '' });
                                setEditingId(null);
                            }}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <div className="admin-list">
                <h2>Features Cadastradas</h2>
                
                {isLoading ? (
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <p>Carregando features...</p>
                    </div>
                ) : features.length === 0 ? (
                    <p className="no-items">Nenhuma feature cadastrada ainda</p>
                ) : (
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Ordem</th>
                                    <th>Título</th>
                                    <th>Descrição</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {features.sort((a, b) => a.ordem - b.ordem).map(feature => (
                                    <tr key={feature._id}>
                                        <td>{feature.ordem}</td>
                                        <td>{feature.titulo}</td>
                                        <td>{feature.descricao}</td>
                                        <td className="actions-cell">
                                            <button 
                                                className="edit-btn"
                                                onClick={() => handleEdit(feature)}
                                                disabled={isLoading}
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                className="delete-btn"
                                                onClick={() => handleDelete(feature._id)}
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