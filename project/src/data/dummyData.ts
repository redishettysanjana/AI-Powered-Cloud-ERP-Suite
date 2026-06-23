import type { Employee, InventoryItem, Project, AIInsight, KPIData } from '../types';

export const kpiData: KPIData = {
  totalEmployees: 1247,
  totalInventory: 8934,
  revenue: 2847500,
  aiForecast: 3120000,
  revenueChange: 12.5,
  employeeChange: 3.2,
  inventoryChange: -2.1,
  forecastChange: 9.6,
};

export const employees: Employee[] = [
  { id: '1', firstName: 'Sarah', lastName: 'Chen', email: 's.chen@amdox.com', department: 'Engineering', position: 'Senior Developer', salary: 125000, hireDate: '2021-03-15', status: 'active', phone: '+1-555-0101' },
  { id: '2', firstName: 'Marcus', lastName: 'Johnson', email: 'm.johnson@amdox.com', department: 'Sales', position: 'Sales Manager', salary: 98000, hireDate: '2020-07-22', status: 'active', phone: '+1-555-0102' },
  { id: '3', firstName: 'Emily', lastName: 'Rodriguez', email: 'e.rodriguez@amdox.com', department: 'Marketing', position: 'Marketing Director', salary: 110000, hireDate: '2019-11-08', status: 'active', phone: '+1-555-0103' },
  { id: '4', firstName: 'David', lastName: 'Kim', email: 'd.kim@amdox.com', department: 'Engineering', position: 'DevOps Engineer', salary: 115000, hireDate: '2022-01-10', status: 'active', phone: '+1-555-0104' },
  { id: '5', firstName: 'Lisa', lastName: 'Thompson', email: 'l.thompson@amdox.com', department: 'HR', position: 'HR Specialist', salary: 75000, hireDate: '2021-06-01', status: 'on-leave', phone: '+1-555-0105' },
  { id: '6', firstName: 'James', lastName: 'Wilson', email: 'j.wilson@amdox.com', department: 'Finance', position: 'Financial Analyst', salary: 88000, hireDate: '2020-09-14', status: 'active', phone: '+1-555-0106' },
  { id: '7', firstName: 'Anna', lastName: 'Patel', email: 'a.patel@amdox.com', department: 'Engineering', position: 'Frontend Developer', salary: 95000, hireDate: '2022-04-20', status: 'active', phone: '+1-555-0107' },
  { id: '8', firstName: 'Robert', lastName: 'Brown', email: 'r.brown@amdox.com', department: 'Operations', position: 'Operations Manager', salary: 102000, hireDate: '2018-12-03', status: 'active', phone: '+1-555-0108' },
  { id: '9', firstName: 'Jennifer', lastName: 'Lee', email: 'j.lee@amdox.com', department: 'Sales', position: 'Account Executive', salary: 82000, hireDate: '2021-08-16', status: 'active', phone: '+1-555-0109' },
  { id: '10', firstName: 'Michael', lastName: 'Davis', email: 'm.davis@amdox.com', department: 'Engineering', position: 'Backend Developer', salary: 105000, hireDate: '2020-05-27', status: 'inactive', phone: '+1-555-0110' },
];

export const inventoryItems: InventoryItem[] = [
  { id: '1', name: 'AMD Ryzen 9 7950X', sku: 'CPU-RZN9-7950X', category: 'Processors', quantity: 450, unitPrice: 549.99, reorderLevel: 100, supplier: 'AMD Direct', location: 'Warehouse A', status: 'in-stock' },
  { id: '2', name: 'NVIDIA RTX 4090', sku: 'GPU-RTX-4090', category: 'Graphics Cards', quantity: 85, unitPrice: 1599.99, reorderLevel: 50, supplier: 'NVIDIA Distribution', location: 'Warehouse A', status: 'low-stock' },
  { id: '3', name: 'Samsung 990 Pro 2TB', sku: 'SSD-990P-2TB', category: 'Storage', quantity: 1200, unitPrice: 179.99, reorderLevel: 200, supplier: 'Samsung B2B', location: 'Warehouse B', status: 'in-stock' },
  { id: '4', name: 'Corsair DDR5 32GB Kit', sku: 'RAM-DDR5-32G', category: 'Memory', quantity: 30, unitPrice: 129.99, reorderLevel: 100, supplier: 'Corsair Enterprise', location: 'Warehouse B', status: 'low-stock' },
  { id: '5', name: 'ASUS ROG Maximus Z790', sku: 'MBD-Z790-ROG', category: 'Motherboards', quantity: 0, unitPrice: 629.99, reorderLevel: 25, supplier: 'ASUS Business', location: 'Warehouse A', status: 'out-of-stock' },
  { id: '6', name: 'Intel Core i9-13900K', sku: 'CPU-INT-I9-13K', category: 'Processors', quantity: 320, unitPrice: 589.99, reorderLevel: 80, supplier: 'Intel Direct', location: 'Warehouse A', status: 'in-stock' },
  { id: '7', name: 'Logitech MX Master 3S', sku: 'PER-MXM-3S', category: 'Peripherals', quantity: 560, unitPrice: 99.99, reorderLevel: 150, supplier: 'Logitech B2B', location: 'Warehouse C', status: 'in-stock' },
  { id: '8', name: 'Dell UltraSharp U2723QE', sku: 'MON-U27-4K', category: 'Monitors', quantity: 45, unitPrice: 679.99, reorderLevel: 30, supplier: 'Dell Enterprise', location: 'Warehouse C', status: 'low-stock' },
];

export const projects: Project[] = [
  { id: '1', name: 'Cloud Migration 2024', description: 'Migrate legacy on-premise infrastructure to cloud-native architecture', status: 'in-progress', progress: 68, budget: 850000, spent: 578000, startDate: '2024-01-15', endDate: '2024-12-31', manager: 'Sarah Chen', teamSize: 12 },
  { id: '2', name: 'AI Analytics Platform', description: 'Build next-generation AI-powered business analytics dashboard', status: 'in-progress', progress: 42, budget: 1200000, spent: 504000, startDate: '2024-03-01', endDate: '2025-06-30', manager: 'David Kim', teamSize: 18 },
  { id: '3', name: 'ERP Integration Phase 2', description: 'Integrate third-party logistics and supply chain modules', status: 'completed', progress: 100, budget: 450000, spent: 438000, startDate: '2023-06-01', endDate: '2024-02-28', manager: 'Robert Brown', teamSize: 8 },
  { id: '4', name: 'Cybersecurity Overhaul', description: 'Implement zero-trust security architecture across all systems', status: 'planning', progress: 15, budget: 600000, spent: 90000, startDate: '2024-07-01', endDate: '2025-03-31', manager: 'Marcus Johnson', teamSize: 6 },
  { id: '5', name: 'Mobile App Redesign', description: 'Redesign customer-facing mobile application with modern UX', status: 'on-hold', progress: 35, budget: 320000, spent: 112000, startDate: '2024-02-01', endDate: '2024-08-31', manager: 'Anna Patel', teamSize: 5 },
];

export const aiInsights: AIInsight[] = [
  { id: '1', title: 'Q3 Revenue Surge Predicted', description: 'AI models predict a 15% revenue increase in Q3 driven by new product launches and seasonal demand patterns.', category: 'forecast', confidence: 92, impact: 'high', date: '2024-06-20' },
  { id: '2', title: 'Inventory Optimization Needed', description: 'Stock levels for Graphics Cards category are projected to fall below optimal levels by mid-July. Recommend increasing orders by 25%.', category: 'recommendation', confidence: 87, impact: 'high', date: '2024-06-19' },
  { id: '3', title: 'Employee Retention Risk', description: 'Engineering department shows elevated attrition risk. Three senior developers have low engagement scores. Proactive retention measures advised.', category: 'anomaly', confidence: 78, impact: 'medium', date: '2024-06-18' },
  { id: '4', title: 'Supply Chain Delay Alert', description: 'Predicted 2-week delay in motherboard shipments from ASUS Business. Alternative sourcing recommended.', category: 'anomaly', confidence: 84, impact: 'medium', date: '2024-06-17' },
  { id: '5', title: 'Marketing ROI Optimization', description: 'Reallocate 30% of Q3 digital ad spend from display to search campaigns for projected 22% improvement in customer acquisition cost.', category: 'recommendation', confidence: 89, impact: 'high', date: '2024-06-16' },
  { id: '6', title: 'Cloud Cost Forecast', description: 'Infrastructure costs trending 18% above budget. AI suggests rightsizing underutilized compute instances in us-east-1.', category: 'forecast', confidence: 95, impact: 'medium', date: '2024-06-15' },
];

export const revenueChartData = [
  { month: 'Jan', revenue: 210000, forecast: 210000 },
  { month: 'Feb', revenue: 225000, forecast: 220000 },
  { month: 'Mar', revenue: 240000, forecast: 235000 },
  { month: 'Apr', revenue: 235000, forecast: 245000 },
  { month: 'May', revenue: 260000, forecast: 255000 },
  { month: 'Jun', revenue: 275000, forecast: 270000 },
  { month: 'Jul', revenue: 290000, forecast: 285000 },
  { month: 'Aug', revenue: 310000, forecast: 300000 },
  { month: 'Sep', revenue: 325000, forecast: 315000 },
  { month: 'Oct', revenue: 340000, forecast: 330000 },
  { month: 'Nov', revenue: 355000, forecast: 345000 },
  { month: 'Dec', revenue: 380000, forecast: 360000 },
];

export const departmentChartData = [
  { name: 'Engineering', value: 42 },
  { name: 'Sales', value: 28 },
  { name: 'Marketing', value: 15 },
  { name: 'Operations', value: 20 },
  { name: 'HR', value: 8 },
  { name: 'Finance', value: 12 },
];

export const inventoryCategoryData = [
  { name: 'Processors', value: 770 },
  { name: 'Graphics Cards', value: 85 },
  { name: 'Storage', value: 1200 },
  { name: 'Memory', value: 30 },
  { name: 'Motherboards', value: 0 },
  { name: 'Peripherals', value: 560 },
  { name: 'Monitors', value: 45 },
];
