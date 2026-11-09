
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();

    const [metrics, setMetrics] = useState({
        total: 0,
        mealsOnDiet: 0,
        mealsOffDiet: 0,
        bestSequence: 0,
    });

    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadDashboard() {
            try {
                const [metricsResponse, mealsResponse] = await Promise.all([
                    api.get('/metrics'),
                    api.get('/meals'),
                ]);

                setMetrics(metricsResponse.data);
                setMeals(mealsResponse.data);
            } catch (err) {
                if (err.response?.status === 401) {
                    localStorage.removeItem('@daily-diet:token');
                    navigate('/login');
                    return;
                }

                setError('Não foi possível carregar os dados. Tente novamente.');
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, [navigate]);

    function handleLogout() {
        localStorage.removeItem('@daily-diet:token');
        navigate('/login');
    }

    function formatDate(date) {
        return new Date(date).toLocaleString('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short',
        });
    }

    if (loading) {
        return <main className="dashboard-loading">Carregando seu painel...</main>;
    }

    return (
        <main className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1>Daily Diet</h1>
                    <p>Acompanhe sua alimentação diariamente.</p>
                </div>

                <button className="logout-button" onClick={handleLogout}>
                    Sair
                </button>
            </header>

            <section className="welcome-section">
                <div>
                    <h2>Seu resumo alimentar</h2>
                    <p>Veja como está sua evolução.</p>
                </div>

                <Link to="/refeicoes/nova" className="new-meal-button">
                    + Nova refeição
                </Link>
            </section>

            {error && <p className="dashboard-error">{error}</p>}

            <section className="metrics-grid">
                <article className="metric-card">
                    <span>Total de refeições</span>
                    <strong>{metrics.total}</strong>
                </article>

                <article className="metric-card on-diet">
                    <span>Dentro da dieta</span>
                    <strong>{metrics.mealsOnDiet}</strong>
                </article>

                <article className="metric-card off-diet">
                    <span>Fora da dieta</span>
                    <strong>{metrics.mealsOffDiet}</strong>
                </article>

                <article className="metric-card sequence">
                    <span>Melhor sequência</span>
                    <strong>{metrics.bestSequence}</strong>
                    <small>refeições consecutivas</small>
                </article>
            </section>

            <section className="meals-section">
                <div className="section-heading">
                    <h2>Minhas refeições</h2>
                    <span>{meals.length} registro(s)</span>
                </div>

                {meals.length === 0 ? (
                    <div className="empty-meals">
                        <h3>Nenhuma refeição cadastrada</h3>
                        <p>Comece registrando sua primeira refeição.</p>
                    </div>
                ) : (
                    <div className="meals-list">
                        {meals.map((meal) => (
                            <article className="meal-card" key={meal.id}>
                                <div className="meal-information">
                                    <h3>{meal.name}</h3>
                                    <p>{meal.description}</p>
                                    <small>{formatDate(meal.date)}</small>
                                </div>

                                <span
                                    className={
                                        meal.isOnDiet
                                            ? 'meal-status status-on'
                                            : 'meal-status status-off'
                                    }
                                >
                                    {meal.isOnDiet ? 'Dentro da dieta' : 'Fora da dieta'}
                                </span>
                                <Link to={`/refeicoes/${meal.id}`} className="edit-meal-link">
                                    Ver / editar
                                </Link>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Dashboard;
