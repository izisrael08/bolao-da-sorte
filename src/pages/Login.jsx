import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../styles/Login/index.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e?.preventDefault(); // Previne o comportamento padrão do formulário
    
    if (isSubmitting) return;
    
    // Validação manual dos campos
    if (!email || !senha) {
      setError('Email e senha são obrigatórios');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await api.post('/api/auth/login', {
        email,
        password: senha
      });

      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      navigate('/dashboard');
    } catch (err) {
      console.error("Erro completo:", err);
      const errorMessage = err.response?.data?.error || 
                         err.message || 
                         'Credenciais inválidas';
      setError(errorMessage);
      
      // Foca no campo de senha para facilitar nova tentativa
      document.querySelector('input[type="password"]')?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Bem-vindo</h2>
        <p className="subtitle">Acesse sua conta</p>

        {error && (
          <div className="error-message" style={{ animation: 'shake 0.5s' }}>
            {error}
          </div>
        )}

        <form 
          ref={formRef}
          onSubmit={handleLogin}
          className="form-fields"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            required
            disabled={isSubmitting}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onKeyDown={handleKeyDown}
            required
            disabled={isSubmitting}
          />
          <button 
            type="submit" // Mantém como submit para acessibilidade
            disabled={isSubmitting}
            className={isSubmitting ? 'submitting' : ''}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Entrando...
              </>
            ) : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}