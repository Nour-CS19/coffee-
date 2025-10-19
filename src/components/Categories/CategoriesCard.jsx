import React from 'react';
import Button from '../Common/Button';

const CategoryCard = ({ category, onEdit, onDelete, delay }) => {
  return (
    <div 
      className="category-card"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="category-image">
        {category.image ? (
          <img src={category.image} alt={category.name} />
        ) : (
          <i className="bi bi-image"></i>
        )}
      </div>
      <div className="category-info">
        <h5>{category.name}</h5>
        <p>{category.nameEn}</p>
        <span className="badge bg-secondary">Order: {category.order}</span>
      </div>
      <div className="category-actions">
        <Button 
          size="sm" 
          variant="warning" 
          icon="pencil"
          onClick={onEdit}
        />
        <Button 
          size="sm" 
          variant="danger" 
          icon="trash"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

export default CategoryCard;