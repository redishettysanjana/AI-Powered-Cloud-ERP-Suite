import { Brain, TrendingUp, AlertTriangle, Lightbulb, Gauge, Calendar } from 'lucide-react';
import { aiInsights, revenueChartData } from '../data/dummyData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AIInsights() {
  const forecastInsights = aiInsights.filter((i) => i.category === 'forecast');
  const recommendationInsights = aiInsights.filter((i) => i.category === 'recommendation');
  const anomalyInsights = aiInsights.filter((i) => i.category === 'anomaly');

  const categoryIcon = (cat: string) => {
    switch (cat) {
      case 'forecast':
        return <TrendingUp className="w-5 h-5 text-primary-500" />;
      case 'recommendation':
        return <Lightbulb className="w-5 h-5 text-accent-500" />;
      case 'anomaly':
        return <AlertTriangle className="w-5 h-5 text-warning-500" />;
      default:
        return <Brain className="w-5 h-5 text-primary-500" />;
    }
  };

  const impactBadge = (impact: string) => {
    const map: Record<string, string> = {
      high: 'bg-error-100 text-error-700',
      medium: 'bg-warning-100 text-warning-700',
      low: 'bg-secondary-100 text-secondary-700',
    };
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${map[impact]}`}>
        {impact}
      </span>
    );
  };

  const confidenceColor = (conf: number) => {
    if (conf >= 90) return 'text-accent-600';
    if (conf >= 80) return 'text-primary-600';
    return 'text-warning-600';
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Brain className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">AI Insights</h1>
            <p className="text-secondary-500 mt-0.5">AI-powered forecasts, recommendations, and anomaly detection</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl p-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-primary-200" />
            <span className="text-sm font-medium text-primary-100">Forecasts</span>
          </div>
          <p className="text-3xl font-bold">{forecastInsights.length}</p>
          <p className="text-sm text-primary-200 mt-1">Predictive models active</p>
        </div>
        <div className="bg-gradient-to-br from-accent-600 to-accent-700 rounded-xl p-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-accent-200" />
            <span className="text-sm font-medium text-accent-100">Recommendations</span>
          </div>
          <p className="text-3xl font-bold">{recommendationInsights.length}</p>
          <p className="text-sm text-accent-200 mt-1">Actionable insights</p>
        </div>
        <div className="bg-gradient-to-br from-warning-500 to-warning-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-warning-100" />
            <span className="text-sm font-medium text-warning-100">Anomalies</span>
          </div>
          <p className="text-3xl font-bold">{anomalyInsights.length}</p>
          <p className="text-sm text-warning-100 mt-1">Issues requiring attention</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-secondary-900 mb-1">AI Revenue Forecast Model</h2>
        <p className="text-sm text-secondary-500 mb-6">Machine learning prediction vs actual revenue</p>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={revenueChartData}>
            <defs>
              <linearGradient id="aiRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="aiForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#aiRevenue)" name="Actual Revenue" />
            <Area type="monotone" dataKey="forecast" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" fill="url(#aiForecast)" name="AI Forecast" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center gap-2">
            <Gauge className="w-5 h-5 text-primary-500" />
            All Insights
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {aiInsights.map((insight) => (
              <div key={insight.id} className="bg-white rounded-xl shadow-sm border border-secondary-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {categoryIcon(insight.category)}
                    <span className="text-xs font-medium text-secondary-500 uppercase tracking-wide">{insight.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {impactBadge(insight.impact)}
                  </div>
                </div>
                <h3 className="text-base font-semibold text-secondary-900 mb-2">{insight.title}</h3>
                <p className="text-sm text-secondary-600 leading-relaxed mb-4">{insight.description}</p>
                <div className="flex items-center justify-between text-xs text-secondary-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(insight.date).toLocaleDateString()}</span>
                  </div>
                  <div className={`font-medium ${confidenceColor(insight.confidence)}`}>
                    {insight.confidence}% confidence
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
