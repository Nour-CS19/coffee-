import React from 'react';
import { useApp } from '../../context/AppContext';
import StatCard from './StatCard';
import Loading from '../Common/Loading';

const Dashboard = () => {
  const { categories, items, loading } = useApp();

  if (loading) return <Loading fullScreen />;

  const stats = [
    { 
      title: 'Total Categories', 
      value: categories.length, 
      icon: 'grid-3x3', 
      color: '#FF6B6B',
      trend: '+12%'
    },
    { 
      title: 'Total Items', 
      value: items.length, 
      icon: 'cup-hot', 
      color: '#4ECDC4',
      trend: '+8%'
    },
    { 
      title: 'Active Categories', 
      value: categories.length, 
      icon: 'check-circle', 
      color: '#95E1D3',
      trend: '100%'
    },
    { 
      title: 'Avg Price', 
      value: items.length > 0 
        ? `${(items.reduce((acc, item) => acc + parseFloat(item.price || 0), 0) / items.length).toFixed(2)} EGP`
        : '0 EGP', 
      icon: 'currency-dollar', 
      color: '#FFE66D',
      trend: '+5%'
    }
  ];

  return (
    <div className="dashboard-page">
      <h2 className="page-title">Dashboard Overview</h2>
      
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} delay={idx * 0.1} />
        ))}
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-grid-3x3 me-2"></i>
                Recent Categories
              </h5>
              <div className="list-group list-group-flush">
                {categories.slice(0, 5).map(cat => (
                  <div key={cat.id} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{cat.name}</strong>
                        <p className="mb-0 text-muted small">{cat.nameEn}</p>
                      </div>
                      <span className="badge bg-primary rounded-pill">
                        Order: {cat.order}
                      </span>
                    </div>
                  </div>
                ))}
                {categories.length === 0 && (
                  <div className="list-group-item text-center text-muted">
                    No categories yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-cup-hot me-2"></i>
                Recent Items
              </h5>
              <div className="list-group list-group-flush">
                {items.slice(0, 5).map(item => (
                  <div key={item.id} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{item.nameAr}</strong>
                        <p className="mb-0 text-muted small">{item.nameEn}</p>
                      </div>
                      <span className="badge bg-success rounded-pill">
                        {item.price} EGP
                      </span>
                    </div>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="list-group-item text-center text-muted">
                    No items yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;