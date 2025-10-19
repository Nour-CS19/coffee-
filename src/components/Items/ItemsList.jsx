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
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <Loading fullScreen />;

  // Filter by category and search term
  const filteredItems = items.filter(item => {
    const matchesCategory = filterCategory === '' || item.categoryId === filterCategory;
    const matchesSearch = searchTerm === '' || 
      item.nameAr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nameEn?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

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

  const clearFilters = () => {
    setSearchTerm('');
    setFilterCategory('');
  };

  return (
    <div className="items-page" style={{ padding: '0.75rem' }}>
      {/* Page Header - Responsive */}
      <div 
        className="page-header" 
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          gap: '0.5rem',
          flexWrap: 'wrap'
        }}
      >
        <h2 
          className="page-title" 
          style={{
            fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
            margin: 0,
            minWidth: 'fit-content'
          }}
        >
          Items Management
        </h2>
        <button
          onClick={() => setShowModal(true)}
          style={{ 
            backgroundColor: 'rgb(13, 110, 253)',
            color: 'white',
            borderRadius: '0.375rem',
            padding: 'clamp(0.4rem, 2vw, 0.5rem) clamp(0.75rem, 3vw, 1rem)',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: 'none',
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
            whiteSpace: 'nowrap',
            minHeight: '36px'
          }}
        >
          <i className="bi bi-plus-circle"></i>
          <span style={{ display: window.innerWidth >= 400 ? 'inline' : 'none' }}>Add Item</span>
        </button>
      </div>

      {/* Search and Filter Section - Responsive */}
      <div className="card mb-4" style={{ borderRadius: '10px' }}>
        <div className="card-body" style={{ padding: 'clamp(0.75rem, 3vw, 1.25rem)' }}>
          <div className="row g-2 g-md-3 align-items-end">
            {/* Search Input */}
            <div className="col-12 col-sm-6 col-md-5">
              <label 
                className="form-label fw-semibold mb-2"
                style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
              >
                <i className="bi bi-search me-2"></i>
                Search Items
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  borderRadius: '10px',
                  height: 'clamp(36px, 10vw, 38px)',
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                  width: '100%'
                }}
              />
            </div>

            {/* Category Filter */}
            <div className="col-12 col-sm-6 col-md-5">
              <label 
                className="form-label fw-semibold mb-2"
                style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
              >
                <i className="bi bi-funnel me-2"></i>
                Filter by Category
              </label>
              <select 
                className="form-select"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                style={{ 
                  borderRadius: '10px',
                  height: 'clamp(36px, 10vw, 38px)',
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                  width: '100%'
                }}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Button */}
            <div className="col-12 col-sm-12 col-md-2">
              {(searchTerm || filterCategory) && (
                <Button
                  variant="outline-secondary"
                  icon="x-circle"
                  onClick={clearFilters}
                  className="w-100"
                  style={{ 
                    minHeight: '36px',
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
          
          {/* Results Summary */}
          {(searchTerm || filterCategory) && (
            <div className="mt-3">
              <small 
                className="text-muted"
                style={{ 
                  fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                  display: 'block',
                  wordBreak: 'break-word'
                }}
              >
                <i className="bi bi-info-circle me-1"></i>
                Showing {filteredItems.length} of {items.length} items
                {searchTerm && ` matching "${searchTerm}"`}
                {filterCategory && searchTerm && ' and'}
                {filterCategory && ` in selected category`}
              </small>
            </div>
          )}
        </div>
      </div>

      {/* Items Table - Responsive wrapper */}
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <ItemsTable
          items={filteredItems}
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchTerm={searchTerm}
          selectedCategory={filterCategory}
        />
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div 
          className="empty-state"
          style={{
            textAlign: 'center',
            padding: 'clamp(1.5rem, 5vw, 3rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <i 
            className="bi bi-cup-hot empty-icon"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}
          ></i>
          <p style={{ 
            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
            margin: '0.5rem 0',
            padding: '0 1rem'
          }}>
            {searchTerm || filterCategory 
              ? 'No items match your filters' 
              : 'No items yet. Create your first item!'}
          </p>
          {(searchTerm || filterCategory) ? (
            <Button 
              variant="secondary" 
              icon="x-circle"
              onClick={clearFilters}
              style={{ 
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                padding: 'clamp(0.4rem, 2vw, 0.5rem) clamp(0.75rem, 3vw, 1rem)'
              }}
            >
              Clear Filters
            </Button>
          ) : (
            <Button 
              variant="primary" 
              onClick={() => setShowModal(true)}
              style={{ 
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                padding: 'clamp(0.4rem, 2vw, 0.5rem) clamp(0.75rem, 3vw, 1rem)'
              }}
            >
              Create Item
            </Button>
          )}
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