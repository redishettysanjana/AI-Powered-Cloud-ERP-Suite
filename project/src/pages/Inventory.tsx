import { useState } from 'react';
import { Plus, Search, Pencil, Trash2, X, Filter, AlertTriangle } from 'lucide-react';
import type { InventoryItem } from '../types';
import { inventoryItems as initialItems } from '../data/dummyData';

export default function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<InventoryItem | null>(null);
  const [form, setForm] = useState<Partial<InventoryItem>>({});

  const statuses = ['All', 'in-stock', 'low-stock', 'out-of-stock'];

  const filtered = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const openAdd = () => {
    setEditing(null);
    setForm({ status: 'in-stock' });
    setShowModal(true);
  };

  const openEdit = (item: InventoryItem) => {
    setEditing(item);
    setForm({ ...item });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const computeStatus = (qty: number, reorder: number): InventoryItem['status'] => {
    if (qty === 0) return 'out-of-stock';
    if (qty <= reorder) return 'low-stock';
    return 'in-stock';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = Number(form.quantity) || 0;
    const reorder = Number(form.reorderLevel) || 0;
    const status = computeStatus(qty, reorder);

    if (editing) {
      setItems((prev) =>
        prev.map((p) => (p.id === editing.id ? { ...p, ...form, status } as InventoryItem : p))
      );
    } else {
      const newItem: InventoryItem = {
        id: Date.now().toString(),
        name: form.name || '',
        sku: form.sku || '',
        category: form.category || '',
        quantity: qty,
        unitPrice: Number(form.unitPrice) || 0,
        reorderLevel: reorder,
        supplier: form.supplier || '',
        location: form.location || '',
        status,
      };
      setItems((prev) => [...prev, newItem]);
    }
    setShowModal(false);
  };

  const statusBadge = (status: InventoryItem['status']) => {
    const map: Record<string, string> = {
      'in-stock': 'bg-accent-100 text-accent-700',
      'low-stock': 'bg-warning-100 text-warning-700',
      'out-of-stock': 'bg-error-100 text-error-700',
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${map[status]}`}>
        {status.replace('-', ' ')}
      </span>
    );
  };

  const lowStockCount = items.filter((i) => i.status === 'low-stock').length;
  const outOfStockCount = items.filter((i) => i.status === 'out-of-stock').length;

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Inventory Management</h1>
          <p className="text-secondary-500 mt-1">Track stock levels and manage inventory</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {(lowStockCount > 0 || outOfStockCount > 0) && (
        <div className="bg-warning-50 border border-warning-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-warning-800">
              Inventory Alerts
            </p>
            <p className="text-sm text-warning-700 mt-0.5">
              {lowStockCount} item{lowStockCount !== 1 ? 's' : ''} low on stock, {outOfStockCount} item{outOfStockCount !== 1 ? 's' : ''} out of stock.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-secondary-200">
        <div className="p-4 border-b border-secondary-200 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search inventory..."
              className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm bg-white"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s.replace('-', ' ')}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary-50 text-secondary-700 font-medium">
              <tr>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">SKU</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Unit Price</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-secondary-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-secondary-900">{item.name}</div>
                    <div className="text-secondary-500 text-xs">{item.supplier}</div>
                  </td>
                  <td className="px-6 py-4 text-secondary-700 font-mono text-xs">{item.sku}</td>
                  <td className="px-6 py-4 text-secondary-700">{item.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-secondary-900 font-medium">{item.quantity}</span>
                      <div className="w-16 h-1.5 bg-secondary-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.status === 'in-stock'
                              ? 'bg-accent-500'
                              : item.status === 'low-stock'
                              ? 'bg-warning-500'
                              : 'bg-error-500'
                          }`}
                          style={{ width: `${Math.min((item.quantity / (item.reorderLevel * 3)) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-secondary-700">${item.unitPrice.toFixed(2)}</td>
                  <td className="px-6 py-4">{statusBadge(item.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="p-1.5 text-secondary-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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
                  <td colSpan={7} className="px-6 py-8 text-center text-secondary-500">
                    No inventory items found.
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
                {editing ? 'Edit Item' : 'Add Item'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-secondary-400 hover:text-secondary-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Product Name</label>
                <input
                  required
                  value={form.name || ''}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">SKU</label>
                  <input
                    required
                    value={form.sku || ''}
                    onChange={(e) => setForm({ ...form, sku: e.target.value })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Category</label>
                  <input
                    required
                    value={form.category || ''}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    required
                    value={form.quantity || ''}
                    onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Unit Price</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={form.unitPrice || ''}
                    onChange={(e) => setForm({ ...form, unitPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Reorder Level</label>
                  <input
                    type="number"
                    required
                    value={form.reorderLevel || ''}
                    onChange={(e) => setForm({ ...form, reorderLevel: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Location</label>
                  <input
                    required
                    value={form.location || ''}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Supplier</label>
                <input
                  required
                  value={form.supplier || ''}
                  onChange={(e) => setForm({ ...form, supplier: e.target.value })}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                />
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
