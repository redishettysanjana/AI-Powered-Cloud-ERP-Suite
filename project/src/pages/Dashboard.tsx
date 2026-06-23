import { Users, Package, DollarSign, Brain, TrendingUp } from 'lucide-react';
import KPICard from '../components/KPICard';
import { kpiData, revenueChartData, departmentChartData } from '../data/dummyData';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export default function Dashboard() {
  const formatCurrency = (val: number) => `$${(val / 1000).toFixed(0)}k`;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-900">Dashboard</h1>
        <p className="text-secondary-500 mt-1">Welcome back, Alex. Here's your business overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Employees"
          value={kpiData.totalEmployees.toLocaleString()}
          change={kpiData.employeeChange}
          icon={<Users className="w-6 h-6" />}
          color="primary"
        />
        <KPICard
          title="Inventory Items"
          value={kpiData.totalInventory.toLocaleString()}
          change={kpiData.inventoryChange}
          icon={<Package className="w-6 h-6" />}
          color="accent"
        />
        <KPICard
          title="Revenue YTD"
          value={`$${(kpiData.revenue / 1000000).toFixed(2)}M`}
          change={kpiData.revenueChange}
          icon={<DollarSign className="w-6 h-6" />}
          color="warning"
        />
        <KPICard
          title="AI Demand Forecast"
          value={`$${(kpiData.aiForecast / 1000000).toFixed(2)}M`}
          change={kpiData.forecastChange}
          icon={<Brain className="w-6 h-6" />}
          color="primary"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-secondary-900">Revenue vs Forecast</h2>
              <p className="text-sm text-secondary-500">Monthly performance tracking</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-primary-500" />
                <span className="text-secondary-600">Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-accent-400" />
                <span className="text-secondary-600">Forecast</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={revenueChartData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={formatCurrency} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              <Area type="monotone" dataKey="forecast" stroke="#34d399" strokeWidth={2} fillOpacity={1} fill="url(#colorForecast)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
          <h2 className="text-lg font-semibold text-secondary-900 mb-1">Department Distribution</h2>
          <p className="text-sm text-secondary-500 mb-6">Employee count by department</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={departmentChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                {departmentChartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value} employees`, '']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {departmentChartData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2 text-sm">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-secondary-600 truncate">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
        <h2 className="text-lg font-semibold text-secondary-900 mb-1">Monthly Revenue Trend</h2>
        <p className="text-sm text-secondary-500 mb-6">Revenue performance over time</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={formatCurrency} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
