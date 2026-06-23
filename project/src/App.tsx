import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Inventory from './pages/Inventory';
import Projects from './pages/Projects';
import AIInsights from './pages/AIInsights';
import Reports from './pages/Reports';

export type Page = 'dashboard' | 'employees' | 'inventory' | 'projects' | 'ai-insights' | 'reports';

function App() {
  const { isAuthenticated, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'employees':
        return <Employees />;
      case 'inventory':
        return <Inventory />;
      case 'projects':
        return <Projects />;
      case 'ai-insights':
        return <AIInsights />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage} onLogout={logout}>
      {renderPage()}
    </Layout>
  );
}

export default App;
