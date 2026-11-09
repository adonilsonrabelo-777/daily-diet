
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NovaRefeicao from './pages/NovaRefeicao';
import EditarRefeicao from './pages/EditarRefeicao';

// Protege as páginas que exigem autenticação
function RotaProtegida({ children }) {
  const token = localStorage.getItem('@daily-diet:token');

  return token ? children : <Navigate to="/login" replace />;
}



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <RotaProtegida>
              <Dashboard />
            </RotaProtegida>
          }
        />
        <Route
          path="/refeicoes/nova"
          element={
            <RotaProtegida>
              <NovaRefeicao />
            </RotaProtegida>
          }
        />
        <Route
          path="/refeicoes/:id"
          element={
            <RotaProtegida>
              <EditarRefeicao />
            </RotaProtegida>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
