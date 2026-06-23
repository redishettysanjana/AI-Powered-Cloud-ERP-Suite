import { useState } from 'react';
import { FileText, Download, Calendar, Users, Package, FolderKanban, TrendingUp } from 'lucide-react';
import { employees, inventoryItems, projects, revenueChartData } from '../data/dummyData';

export default function Reports() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = (reportName: string) => {
    setDownloading(true);
    setTimeout(() => {
      const blob = new Blob([`Amdox Technologies - ${reportName}\n\nGenerated: ${new Date().toLocaleString()}\n\nThis is a demo report. In production, this would be a fully generated PDF report.\n\nData summary included in this report would contain relevant business metrics.`], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportName.replace(/\s+/g, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      setDownloading(false);
    }, 1500);
  };

  const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0);
  const inventoryValue = inventoryItems.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
  const totalRevenue = revenueChartData.reduce((sum, r) => sum + r.revenue, 0);

  const reports = [
    {
      id: 'employee',
      title: 'Employee Report',
      description: 'Complete workforce analysis including headcount, salaries, and department breakdown.',
      icon: Users,
      color: 'bg-primary-50 text-primary-600',
      stats: [
        { label: 'Total Employees', value: employees.length.toString() },
        { label: 'Total Payroll', value: `$${(totalSalary / 1000000).toFixed(2)}M` },
        { label: 'Departments', value: String(new Set(employees.map((e) => e.department)).size) },
      ],
    },
    {
      id: 'inventory',
      title: 'Inventory Report',
      description: 'Stock levels, valuation, and inventory turnover analysis.',
      icon: Package,
      color: 'bg-accent-50 text-accent-600',
      stats: [
        { label: 'Total Items', value: inventoryItems.length.toString() },
        { label: 'Inventory Value', value: `$${(inventoryValue / 1000000).toFixed(2)}M` },
        { label: 'Low Stock', value: inventoryItems.filter((i) => i.status === 'low-stock').length.toString() },
      ],
    },
    {
      id: 'project',
      title: 'Project Report',
      description: 'Project status, budget utilization, and timeline tracking.',
      icon: FolderKanban,
      color: 'bg-warning-50 text-warning-600',
      stats: [
        { label: 'Total Projects', value: projects.length.toString() },
        { label: 'Total Budget', value: `$${(totalBudget / 1000000).toFixed(2)}M` },
        { label: 'Budget Used', value: `${((totalSpent / totalBudget) * 100).toFixed(1)}%` },
      ],
    },
    {
      id: 'financial',
      title: 'Financial Report',
      description: 'Revenue analysis, profit margins, and financial forecasting.',
      icon: TrendingUp,
      color: 'bg-secondary-50 text-secondary-600',
      stats: [
        { label: 'YTD Revenue', value: `$${(totalRevenue / 1000000).toFixed(2)}M` },
        { label: 'Monthly Avg', value: `$${((totalRevenue / 12) / 1000).toFixed(0)}k` },
        { label: 'Growth', value: '+12.5%' },
      ],
    },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Reports</h1>
          <p className="text-secondary-500 mt-1">Generate and download business reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <div key={report.id} className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${report.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-secondary-900">{report.title}</h3>
                  <p className="text-sm text-secondary-500 mt-1">{report.description}</p>

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {report.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="text-xs text-secondary-500">{stat.label}</p>
                        <p className="text-sm font-semibold text-secondary-900 mt-0.5">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleDownload(report.title)}
                    disabled={downloading}
                    className="mt-5 inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    {downloading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    Download Report
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-secondary-50 rounded-xl border border-secondary-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-5 h-5 text-secondary-500" />
          <h2 className="text-base font-semibold text-secondary-900">Scheduled Reports</h2>
        </div>
        <div className="space-y-3">
          {[
            { name: 'Weekly Executive Summary', schedule: 'Every Monday at 8:00 AM', status: 'Active' },
            { name: 'Monthly Financial Review', schedule: '1st of every month', status: 'Active' },
            { name: 'Quarterly Board Report', schedule: 'Q1, Q2, Q3, Q4', status: 'Active' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-4 border border-secondary-200">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-secondary-400" />
                <div>
                  <p className="text-sm font-medium text-secondary-900">{item.name}</p>
                  <p className="text-xs text-secondary-500">{item.schedule}</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-100 text-accent-700">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
