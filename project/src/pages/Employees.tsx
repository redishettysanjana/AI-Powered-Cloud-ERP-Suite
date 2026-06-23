import { useState } from 'react';
import { Plus, Search, Pencil, Trash2, X, Filter } from 'lucide-react';
import type { Employee } from '../types';
import { employees as initialEmployees } from '../data/dummyData';

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [form, setForm] = useState<Partial<Employee>>({});

  const departments = ['All', ...Array.from(new Set(employees.map((e) => e.department)))];

  const filtered = employees.filter((e) => {
    const matchesSearch =
      e.firstName.toLowerCase().includes(search.toLowerCase()) ||
      e.lastName.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.position.toLowerCase().includes(search.toLowerCase());
    const matchesDept = filterDept === 'All' || e.department === filterDept;
    return matchesSearch && matchesDept;
  });

  const openAdd = () => {
    setEditing(null);
    setForm({ status: 'active' });
    setShowModal(true);
  };

  const openEdit = (emp: Employee) => {
    setEditing(emp);
    setForm({ ...emp });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setEmployees((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...form } as Employee : p)));
    } else {
      const newEmp: Employee = {
        id: Date.now().toString(),
        firstName: form.firstName || '',
        lastName: form.lastName || '',
        email: form.email || '',
        department: form.department || '',
        position: form.position || '',
        salary: Number(form.salary) || 0,
        hireDate: form.hireDate || new Date().toISOString().split('T')[0],
        status: (form.status as Employee['status']) || 'active',
        phone: form.phone || '',
      };
      setEmployees((prev) => [...prev, newEmp]);
    }
    setShowModal(false);
  };

  const statusBadge = (status: Employee['status']) => {
    const map: Record<string, string> = {
      active: 'bg-accent-100 text-accent-700',
      inactive: 'bg-secondary-100 text-secondary-700',
      'on-leave': 'bg-warning-100 text-warning-700',
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${map[status] || map.inactive}`}>
        {status.replace('-', ' ')}
      </span>
    );
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Employee Management</h1>
          <p className="text-secondary-500 mt-1">Manage your workforce and HR records</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-secondary-200">
        <div className="p-4 border-b border-secondary-200 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search employees..."
              className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="pl-10 pr-8 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm bg-white"
            >
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary-50 text-secondary-700 font-medium">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Position</th>
                <th className="px-6 py-3">Salary</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100">
              {filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-secondary-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">
                        {emp.firstName[0]}{emp.lastName[0]}
                      </div>
                      <div>
                        <div className="font-medium text-secondary-900">{emp.firstName} {emp.lastName}</div>
                        <div className="text-secondary-500 text-xs">{emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-secondary-700">{emp.department}</td>
                  <td className="px-6 py-4 text-secondary-700">{emp.position}</td>
                  <td className="px-6 py-4 text-secondary-700">${emp.salary.toLocaleString()}</td>
                  <td className="px-6 py-4">{statusBadge(emp.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(emp)}
                        className="p-1.5 text-secondary-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="p-1.5 text-secondary-500 hover:text-error-600 hover:bg-error-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-secondary-500">
                    No employees found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-secondary-200">
              <h2 className="text-lg font-semibold text-secondary-900">
                {editing ? 'Edit Employee' : 'Add Employee'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-secondary-400 hover:text-secondary-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">First Name</label>
                  <input
                    required
                    value={form.firstName || ''}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Last Name</label>
                  <input
                    required
                    value={form.lastName || ''}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={form.email || ''}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Department</label>
                  <input
                    required
                    value={form.department || ''}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Position</label>
                  <input
                    required
                    value={form.position || ''}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Salary</label>
                  <input
                    type="number"
                    required
                    value={form.salary || ''}
                    onChange={(e) => setForm({ ...form, salary: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Phone</label>
                  <input
                    value={form.phone || ''}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Hire Date</label>
                  <input
                    type="date"
                    required
                    value={form.hireDate || ''}
                    onChange={(e) => setForm({ ...form, hireDate: e.target.value })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Status</label>
                  <select
                    value={form.status || 'active'}
                    onChange={(e) => setForm({ ...form, status: e.target.value as Employee['status'] })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="on-leave">On Leave</option>
                  </select>
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
