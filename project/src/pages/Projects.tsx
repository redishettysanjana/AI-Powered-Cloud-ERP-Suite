import { useState } from 'react';
import { Plus, Search, Pencil, Trash2, X, Calendar, Users, DollarSign } from 'lucide-react';
import type { Project } from '../types';
import { projects as initialProjects } from '../data/dummyData';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Partial<Project>>({});

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.manager.toLowerCase().includes(search.toLowerCase()) ||
    p.status.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm({ status: 'planning', progress: 0 });
    setShowModal(true);
  };

  const openEdit = (project: Project) => {
    setEditing(project);
    setForm({ ...project });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setProjects((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...form } as Project : p)));
    } else {
      const newProject: Project = {
        id: Date.now().toString(),
        name: form.name || '',
        description: form.description || '',
        status: (form.status as Project['status']) || 'planning',
        progress: Number(form.progress) || 0,
        budget: Number(form.budget) || 0,
        spent: Number(form.spent) || 0,
        startDate: form.startDate || new Date().toISOString().split('T')[0],
        endDate: form.endDate || '',
        manager: form.manager || '',
        teamSize: Number(form.teamSize) || 0,
      };
      setProjects((prev) => [...prev, newProject]);
    }
    setShowModal(false);
  };

  const statusBadge = (status: Project['status']) => {
    const map: Record<string, string> = {
      planning: 'bg-secondary-100 text-secondary-700',
      'in-progress': 'bg-primary-100 text-primary-700',
      completed: 'bg-accent-100 text-accent-700',
      'on-hold': 'bg-warning-100 text-warning-700',
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${map[status]}`}>
        {status.replace('-', ' ')}
      </span>
    );
  };

  const budgetUsed = (spent: number, budget: number) => {
    const pct = budget > 0 ? (spent / budget) * 100 : 0;
    let color = 'bg-accent-500';
    if (pct > 100) color = 'bg-error-500';
    else if (pct > 80) color = 'bg-warning-500';
    return { pct, color };
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Project Management</h1>
          <p className="text-secondary-500 mt-1">Track projects, budgets, and timelines</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map((project) => {
          const { pct, color } = budgetUsed(project.spent, project.budget);
          return (
            <div key={project.id} className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900">{project.name}</h3>
                  <p className="text-sm text-secondary-500 mt-1 line-clamp-2">{project.description}</p>
                </div>
                <div className="flex items-center gap-1">
                  {statusBadge(project.status)}
                  <button
                    onClick={() => openEdit(project)}
                    className="p-1.5 text-secondary-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors ml-2"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-1.5 text-secondary-400 hover:text-error-600 hover:bg-error-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-secondary-600">Progress</span>
                    <span className="font-medium text-secondary-900">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-secondary-600">Budget Used</span>
                    <span className="font-medium text-secondary-900">
                      ${(project.spent / 1000).toFixed(0)}k / ${(project.budget / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <div className="w-full h-2 bg-secondary-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${color} rounded-full transition-all`}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="flex items-center gap-2 text-sm text-secondary-600">
                    <Calendar className="w-4 h-4 text-secondary-400" />
                    <span>{project.endDate ? new Date(project.endDate).toLocaleDateString() : 'TBD'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary-600">
                    <Users className="w-4 h-4 text-secondary-400" />
                    <span>{project.teamSize} members</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary-600">
                    <DollarSign className="w-4 h-4 text-secondary-400" />
                    <span>{project.manager}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-secondary-500 bg-white rounded-xl border border-secondary-200">
            No projects found matching your search.
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-secondary-200">
              <h2 className="text-lg font-semibold text-secondary-900">
                {editing ? 'Edit Project' : 'Add Project'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-secondary-400 hover:text-secondary-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Project Name</label>
                <input
                  required
                  value={form.name || ''}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={form.description || ''}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Status</label>
                  <select
                    value={form.status || 'planning'}
                    onChange={(e) => setForm({ ...form, status: e.target.value as Project['status'] })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  >
                    <option value="planning">Planning</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="on-hold">On Hold</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Progress (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={form.progress || 0}
                    onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Budget</label>
                  <input
                    type="number"
                    value={form.budget || ''}
                    onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Spent</label>
                  <input
                    type="number"
                    value={form.spent || ''}
                    onChange={(e) => setForm({ ...form, spent: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={form.startDate || ''}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={form.endDate || ''}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Manager</label>
                  <input
                    required
                    value={form.manager || ''}
                    onChange={(e) => setForm({ ...form, manager: e.target.value })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Team Size</label>
                  <input
                    type="number"
                    value={form.teamSize || ''}
                    onChange={(e) => setForm({ ...form, teamSize: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-secondary-700 bg-secondary-100 hover:bg-secondary-200 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                >
                  {editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
