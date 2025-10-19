import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useItems } from '../../hooks/useItems';
import ItemsTable from './ItemsTable';
import ItemModal from './ItemsModel';
import ConfirmDialog from '../Common/ConfirmDialog';
import Button from '../Common/Button';
import Loading from '../Common/Loading';

const ItemsList = () => {
  const { items, categories, loading } = useApp();
  const { deleteItem } = useItems();
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');

  if (loading) return <Loading fullScreen />;

  const filteredItems = filterCategory
    ? items.filter(item => item.categoryId === filterCategory)
    : items;

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDeletingId(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    await deleteItem(deletingId);
    setShowDeleteDialog(false);
    setDeletingId(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  return (
    <div className="items-page">
      <div className="page-header">
        <h2 className="page-title">Items Management</h2>
        <div className="d-flex gap-2 align-items-center">
          <select 
            className="form-select" 
            style={{ width: '200px' }}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <Button 
            variant="primary" 
            icon="plus-circle"
            onClick={() => setShowModal(true)}
          >
            Add Item
          </Button>
        </div>
      </div>

      <ItemsTable
        items={filteredItems}
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {filteredItems.length === 0 && (
        <div className="empty-state">
          <i className="bi bi-cup-hot empty-icon"></i>
          <p>No items yet. Create your first item!</p>
          <Button 
            variant="primary" 
            onClick={() => setShowModal(true)}
          >
            Create Item
          </Button>
        </div>
      )}

      <ItemModal
        isOpen={showModal}
        onClose={handleCloseModal}
        item={editingItem}
      />

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={confirmDelete}
        title="Delete Item"
        message="Are you sure you want to delete this item?"
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};

export default ItemsList;