import React from 'react';
import Button from '../Common/Button';
import { formatPrice } from '../../utils/formatters';

const ItemsTable = ({ items, categories, onEdit, onDelete }) => {
  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Image</th>
            <th>Arabic Name</th>
            <th>English Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Size</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id} style={{ animationDelay: `${index * 0.05}s` }} className="table-row-animated">
              <td>
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.nameAr} 
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                ) : (
                  <div style={{ width: '50px', height: '50px', background: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="bi bi-image"></i>
                  </div>
                )}
              </td>
              <td><strong>{item.nameAr}</strong></td>
              <td>{item.nameEn}</td>
              <td>
                <span className="badge bg-info">
                  {getCategoryName(item.categoryId)}
                </span>
              </td>
              <td><strong>{formatPrice(item.price)}</strong></td>
              <td>
                {item.size && (
                  <span className="badge bg-secondary">{item.size}</span>
                )}
              </td>
              <td>
                <div className="d-flex gap-2">
                  <Button 
                    size="sm" 
                    variant="warning" 
                    icon="pencil"
                    onClick={() => onEdit(item)}
                  />
                  <Button 
                    size="sm" 
                    variant="danger" 
                    icon="trash"
                    onClick={() => onDelete(item.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsTable;