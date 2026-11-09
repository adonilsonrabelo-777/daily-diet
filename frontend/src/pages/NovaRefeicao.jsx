
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './NovaRefeicao.css';

function NovaRefeicao() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [isOnDiet, setIsOnDiet] = useState('true');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/meals', {
        name,
        description,
        date: new Date(date).toISOString(),
        isOnDiet: isOnDiet === 'true',
      });

      alert('Refeição cadastrada com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Não foi possível cadastrar a refeição. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="meal-form-container">
      <section className="meal-form-card">
        <header className="meal-form-header">
          <h1>Nova refeição</h1>
          <p>Registre uma refeição para acompanhar sua alimentação.</p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="meal-form-group">
            <label htmlFor="name">Nome da refeição</label>
            <input
              id="name"
              type="text"
              placeholder="Ex.: Almoço"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="meal-form-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              placeholder="Descreva os alimentos consumidos..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows="4"
              required
            />
          </div>

          <div className="meal-form-group">
            <label htmlFor="date">Data e horário</label>
            <input
              id="date"
              type="datetime-local"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </div>

          <div className="meal-form-group">
            <label htmlFor="isOnDiet">A refeição está dentro da dieta?</label>
            <select
              id="isOnDiet"
              value={isOnDiet}
              onChange={(event) => setIsOnDiet(event.target.value)}
              required
            >
              <option value="true">Sim, dentro da dieta</option>
              <option value="false">Não, fora da dieta</option>
            </select>
          </div>

          {error && <p className="meal-form-error">{error}</p>}

          <div className="meal-form-actions">
            <Link to="/dashboard" className="cancel-meal-button">
              Cancelar
            </Link>

            <button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar refeição'}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default NovaRefeicao;
