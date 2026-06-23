export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
  status: 'active' | 'inactive' | 'on-leave';
  phone: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  unitPrice: number;
  reorderLevel: number;
  supplier: string;
  location: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  manager: string;
  teamSize: number;
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  category: 'forecast' | 'recommendation' | 'anomaly';
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  date: string;
}

export interface KPIData {
  totalEmployees: number;
  totalInventory: number;
  revenue: number;
  aiForecast: number;
  revenueChange: number;
  employeeChange: number;
  inventoryChange: number;
  forecastChange: number;
}
