import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useCategories } from '../../hooks/useCategories';
import CategoryCard from './CategoriesCard';
import CategoryModal from './CategoriesModel';
import ConfirmDialog from '../Common/ConfirmDialog';
import Button from '../Common/Button';
import Loading from '../Common/Loading';

const CategoriesList = () => {
  const { categories, loading } = useApp();
  const { deleteCategory } = useCategories();
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  if (loading) return <Loading fullScreen />;

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDeletingId(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    await deleteCategory(deletingId);
    setShowDeleteDialog(false);
    setDeletingId(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  return (
    <div className="categories-page">
      <div className="page-header">
        <h2 className="page-title">Categories Management</h2>
        <Button 
          variant="primary" 
          icon="plus-circle"
          onClick={() => setShowModal(true)}
        >
          Add Category
        </Button>
      </div>

      <div className="categories-grid">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={() => handleEdit(category)}
            onDelete={() => handleDelete(category.id)}
            delay={index * 0.1}
          />
        ))}
      </div>

      {categories.length === 0 && (
        <div className="empty-state">
          <i className="bi bi-grid-3x3 empty-icon"></i>
          <p>No categories yet. Create your first category!</p>
          <Button 
            variant="primary" 
            onClick={() => setShowModal(true)}
          >
            Create Category
          </Button>
        </div>
      )}

      <CategoryModal
        isOpen={showModal}
        onClose={handleCloseModal}
        category={editingCategory}
      />

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={confirmDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category? This will also delete all items in this category."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};

export default CategoriesList;