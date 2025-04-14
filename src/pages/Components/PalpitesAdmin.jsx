import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/api';

export default function PalpitesAdmin() {
    const [palpites, setPalpites] = useState([]);
    const [novoPalpite, setNovoPalpite] = useState({
        grupo: '',
        milhar: '',
        centena: ''
    });
    const [milharChips, setMilharChips] = useState([]);
    const [centenaChips, setCentenaChips] = useState([]);
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
        carregarPalpites();
    }, []);

    const carregarPalpites = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/api/palpites');
            const palpitesFormatados = response.data.data.map(palpite => ({
                ...palpite,
                milhar: palpite.milhar || '',
                centena: palpite.centena || ''
            }));
            setPalpites(palpitesFormatados || []);
        } catch (error) {
            console.error("Erro ao carregar palpites:", error);
            showError("Erro ao carregar palpites");
        } finally {
            setIsLoading(false);
        }
    };

    // Gerar opções de grupo de 01 a 25
    const grupoOptions = [];
    for (let i = 1; i <= 25; i++) {
        grupoOptions.push(i.toString().padStart(2, '0'));
    }

    const handleGrupoChange = (e) => {
        setNovoPalpite(prevState => ({
            ...prevState,
            grupo: e.target.value
        }));
    };

    const handleMilharCentenaInput = (e) => {
        const { name, value } = e.target;
        const numericValue = value.replace(/\D/g, '');
        
        setNovoPalpite(prev => ({
            ...prev,
            [name]: numericValue
        }));
        
        const maxLength = name === 'milhar' ? 4 : 3;
        if (numericValue.length === maxLength) {
            const chips = name === 'milhar' ? milharChips : centenaChips;
            
            if (!chips.includes(numericValue)) {
                if (name === 'milhar') {
                    setMilharChips(prev => [...prev, numericValue]);
                    setNovoPalpite(prev => ({ ...prev, milhar: '' }));
                } else {
                    setCentenaChips(prev => [...prev, numericValue]);
                    setNovoPalpite(prev => ({ ...prev, centena: '' }));
                }
            } else {
                showError(`O valor ${numericValue} já foi adicionado`);
                setNovoPalpite(prev => ({ ...prev, [name]: '' }));
            }
        }
    };

    const removeMilharChip = (index) => {
        setMilharChips(prev => prev.filter((_, i) => i !== index));
    };

    const removeCentenaChip = (index) => {
        setCentenaChips(prev => prev.filter((_, i) => i !== index));
    };

    const handleEdit = (palpite) => {
        setNovoPalpite({
            grupo: palpite.grupo,
            milhar: '',
            centena: ''
        });
        
        const milhares = palpite.milhar ? palpite.milhar.split(',').map(m => m.trim()) : [];
        const centenas = palpite.centena ? palpite.centena.split(',').map(c => c.trim()) : [];
        
        setMilharChips(milhares);
        setCentenaChips(centenas);
        setEditingId(palpite._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este palpite?')) return;
        
        try {
            await api.delete(`/api/palpites/${id}`);
            carregarPalpites();
            showSuccess("Palpite excluído com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar palpite:", error);
            showError("Erro ao deletar palpite");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!novoPalpite.grupo || milharChips.length === 0 || centenaChips.length === 0) {
            showError("Preencha todos os campos");
            return;
        }

        try {
            const palpiteData = {
                grupo: novoPalpite.grupo,
                milhar: milharChips.join(', '),
                centena: centenaChips.join(', ')
            };

            if (editingId) {
                await api.put(`/api/palpites/${editingId}`, palpiteData);
                showSuccess("Palpite atualizado com sucesso!");
            } else {
                await api.post('/api/palpites', palpiteData);
                showSuccess("Palpite criado com sucesso!");
            }
            
            carregarPalpites();
            setNovoPalpite({ grupo: '', milhar: '', centena: '' });
            setMilharChips([]);
            setCentenaChips([]);
            setEditingId(null);
        } catch (error) {
            console.error("Erro ao salvar palpite:", error);
            showError(error.response?.data?.error || "Erro ao salvar palpite");
        }
    };

    return (
        <div className="dashboard-content">
            <h1>Gerenciamento de Palpites</h1>
            
            <form onSubmit={handleSubmit} className="palpite-form">
                <div className="form-group">
                    <label>Grupo:</label>
                    <select
                        name="grupo"
                        value={novoPalpite.grupo}
                        onChange={handleGrupoChange}
                        required
                        className="grupo-select"
                    >
                        <option value="">Selecione um grupo</option>
                        {grupoOptions.map(grupo => (
                            <option key={grupo} value={grupo}>{grupo}</option>
                        ))}
                    </select>
                </div>
                
                <div className="form-group">
                    <label>Milhar:</label>
                    <input
                        type="text"
                        name="milhar"
                        value={novoPalpite.milhar}
                        onChange={handleMilharCentenaInput}
                        maxLength="4"
                        placeholder="Digite 4 números"
                        className="milhar-input"
                    />
                    <div className="chips-container">
                        {milharChips.map((chip, index) => (
                            <div key={index} className="chip">
                                {chip}
                                <button 
                                    type="button" 
                                    className="chip-remove"
                                    onClick={() => removeMilharChip(index)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="form-group">
                    <label>Centena:</label>
                    <input
                        type="text"
                        name="centena"
                        value={novoPalpite.centena}
                        onChange={handleMilharCentenaInput}
                        maxLength="3"
                        placeholder="Digite 3 números"
                        className="centena-input"
                    />
                    <div className="chips-container">
                        {centenaChips.map((chip, index) => (
                            <div key={index} className="chip">
                                {chip}
                                <button 
                                    type="button" 
                                    className="chip-remove"
                                    onClick={() => removeCentenaChip(index)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
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
                                setNovoPalpite({ grupo: '', milhar: '', centena: '' });
                                setMilharChips([]);
                                setCentenaChips([]);
                                setEditingId(null);
                            }}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <div className="palpites-list">
                <h2 className='H2_Palpites'>Palpites Cadastrados</h2>
                
                {isLoading ? (
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <p>Carregando palpites...</p>
                    </div>
                ) : palpites.length === 0 ? (
                    <p className="no-palpites">Nenhum palpite cadastrado ainda</p>
                ) : (
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Grupo</th>
                                    <th>Milhar</th>
                                    <th>Centena</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {palpites.map(palpite => (
                                    <tr key={palpite._id}>
                                        <td>{palpite.grupo}</td>
                                        <td>{palpite.milhar}</td>
                                        <td>{palpite.centena}</td>
                                        <td className="actions-cell">
                                            <button 
                                                className="edit-btn"
                                                onClick={() => handleEdit(palpite)}
                                                disabled={isLoading}
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                className="delete-btn"
                                                onClick={() => handleDelete(palpite._id)}
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