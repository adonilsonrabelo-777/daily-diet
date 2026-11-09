
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Cadastro.css';

function Cadastro() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/users', {
        name,
        email,
        password,
      });

      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Não foi possível realizar o cadastro. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="register-container">
      <section className="register-card">
        <div className="register-header">
          <h1>Daily Diet</h1>
          <p>Crie sua conta e comece a acompanhar sua alimentação.</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Nome completo</label>
            <input
              id="name"
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

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
              placeholder="Crie uma senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={6}
              required
            />
          </div>

          {error && <p className="register-error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Criar minha conta'}
          </button>
        </form>

        <p className="register-footer">
          Já possui uma conta? <Link to="/login">Faça login</Link>
        </p>
      </section>
    </main>
  );
}

export default Cadastro;
