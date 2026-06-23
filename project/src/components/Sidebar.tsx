import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Package,
  FolderKanban,
  Brain,
  FileText,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Building2,
} from 'lucide-react';
import type { Page } from '../App';

const menuItems: { page: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { page: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { page: 'employees', label: 'Employees', icon: Users },
  { page: 'inventory', label: 'Inventory', icon: Package },
  { page: 'projects', label: 'Projects', icon: FolderKanban },
  { page: 'ai-insights', label: 'AI Insights', icon: Brain },
  { page: 'reports', label: 'Reports', icon: FileText },
];

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export default function Sidebar({ currentPage, onNavigate, onLogout }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`bg-secondary-900 text-white flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="h-16 flex items-center px-4 border-b border-secondary-700">
        <Building2 className="w-8 h-8 text-primary-400 flex-shrink-0" />
        {!collapsed && (
          <div className="ml-3 overflow-hidden">
            <h1 className="text-lg font-bold tracking-tight whitespace-nowrap">Amdox ERP</h1>
            <p className="text-xs text-secondary-400 whitespace-nowrap">Enterprise Suite</p>
          </div>
        )}
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-secondary-300 hover:bg-secondary-800 hover:text-white'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="ml-3 whitespace-nowrap">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-2 border-t border-secondary-700 space-y-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center px-3 py-2.5 rounded-lg text-secondary-300 hover:bg-secondary-800 hover:text-white transition-colors text-sm font-medium"
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 flex-shrink-0" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 flex-shrink-0" />
              <span className="ml-3 whitespace-nowrap">Collapse</span>
            </>
          )}
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center px-3 py-2.5 rounded-lg text-error-400 hover:bg-error-900/30 transition-colors text-sm font-medium"
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="ml-3 whitespace-nowrap">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
