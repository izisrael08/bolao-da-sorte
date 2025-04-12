import '../styles/Login/index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'israelguedes008@gmail.com' && senha === '123') {
      navigate('/dashboard');
    } else {
      setError('Email ou senha inválidos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Bem-vindo</h2>
        <p className="subtitle">Acesse sua conta</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>

        <div className="login-footer">
          <a href="#">Esqueceu sua senha?</a>
        </div>
      </div>
    </div>
  );
}
