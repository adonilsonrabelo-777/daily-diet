
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });

      const { token } = response.data;

      localStorage.setItem('@daily-diet:token', token);

      navigate('/dashboard');
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'E-mail ou senha inválidos. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-container">
      <section className="login-card">
        <header className="login-header">
          <h1>Daily Diet</h1>
          <p>Bem-vindo de volta!</p>
          <span>Acesse sua conta para acompanhar sua alimentação.</span>
        </header>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="login-footer">
          Ainda não possui uma conta?{' '}
          <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
