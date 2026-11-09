
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import './EditarRefeicao.css';

function formatDateForInput(date) {
  const localDate = new Date(date);

  localDate.setMinutes(
    localDate.getMinutes() - localDate.getTimezoneOffset()
  );

  return localDate.toISOString().slice(0, 16);
}

function EditarRefeicao() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [isOnDiet, setIsOnDiet] = useState('true');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadMeal() {
      try {
        const response = await api.get(`/meals/${id}`);
        const meal = response.data;

        setName(meal.name);
        setDescription(meal.description);
        setDate(formatDateForInput(meal.date));
        setIsOnDiet(String(meal.isOnDiet));
      } catch (err) {
        setError(
          err.response?.data?.message ||
          'Não foi possível carregar a refeição.'
        );
      } finally {
        setLoading(false);
      }
    }

    loadMeal();
  }, [id]);

  async function handleUpdate(event) {
    event.preventDefault();
    setError('');
    setSaving(true);

    try {
      await api.put(`/meals/${id}`, {
        name,
        description,
        date: new Date(date).toISOString(),
        isOnDiet: isOnDiet === 'true',
      });

      alert('Refeição atualizada com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Não foi possível atualizar a refeição.'
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      'Tem certeza de que deseja excluir esta refeição?'
    );

    if (!confirmed) return;

    try {
      await api.delete(`/meals/${id}`);

      alert('Refeição excluída com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Não foi possível excluir a refeição.'
      );
    }
  }

  if (loading) {
    return <main className="edit-loading">Carregando refeição...</main>;
  }

  return (
    <main className="edit-meal-container">
      <section className="edit-meal-card">
        <header className="edit-meal-header">
          <h1>Detalhes da refeição</h1>
          <p>Consulte ou atualize as informações registradas.</p>
        </header>

        {error && <p className="edit-meal-error">{error}</p>}

        {!error || name ? (
          <form onSubmit={handleUpdate}>
            <div className="edit-meal-group">
              <label htmlFor="name">Nome da refeição</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div className="edit-meal-group">
              <label htmlFor="description">Descrição</label>
              <textarea
                id="description"
                rows="4"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </div>

            <div className="edit-meal-group">
              <label htmlFor="date">Data e horário</label>
              <input
                id="date"
                type="datetime-local"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </div>

            <div className="edit-meal-group">
              <label htmlFor="isOnDiet">Está dentro da dieta?</label>
              <select
                id="isOnDiet"
                value={isOnDiet}
                onChange={(event) => setIsOnDiet(event.target.value)}
              >
                <option value="true">Sim, dentro da dieta</option>
                <option value="false">Não, fora da dieta</option>
              </select>
            </div>

            <div className="edit-meal-actions">
              <Link to="/dashboard" className="back-meal-button">
                Voltar
              </Link>

              <button type="button" className="delete-meal-button" onClick={handleDelete}>
                Excluir
              </button>

              <button type="submit" className="save-meal-button" disabled={saving}>
                {saving ? 'Salvando...' : 'Salvar alterações'}
              </button>
            </div>
          </form>
        ) : (
          <Link to="/dashboard" className="back-meal-button">
            Voltar ao dashboard
          </Link>
        )}
      </section>
    </main>
  );
}

export default EditarRefeicao;
