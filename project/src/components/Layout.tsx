import Sidebar from './Sidebar';
import type { Page } from '../App';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export default function Layout({ children, currentPage, onNavigate, onLogout }: LayoutProps) {
  return (
    <div className="flex h-screen bg-secondary-50">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
