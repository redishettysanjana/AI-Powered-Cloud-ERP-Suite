import type { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  icon: ReactNode;
  color: 'primary' | 'accent' | 'warning' | 'error';
}

const colorMap = {
  primary: 'bg-primary-50 text-primary-600',
  accent: 'bg-accent-50 text-accent-600',
  warning: 'bg-warning-50 text-warning-600',
  error: 'bg-error-50 text-error-600',
};

export default function KPICard({ title, value, change, icon, color }: KPICardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-secondary-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-secondary-900">{value}</h3>
          <div className={`flex items-center mt-2 text-sm font-medium ${isPositive ? 'text-accent-600' : 'text-error-600'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            <span>{isPositive ? '+' : ''}{change}%</span>
            <span className="text-secondary-400 ml-1 font-normal">vs last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
