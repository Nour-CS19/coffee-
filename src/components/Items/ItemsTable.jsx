import React, { useState } from 'react';
import Button from '../Common/Button';
import { formatPrice } from '../../utils/formatters';
import '../../styles/responsive.css';
const ItemsTable = ({ items, categories, onEdit, onDelete, searchTerm = '', selectedCategory = '' }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  // Filter items based on search and category FIRST
  const filteredItems = items.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.nameAr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nameEn?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || 
      item.categoryId === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Calculate pagination AFTER filtering
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== '...' && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="text-center">Image</th>
              <th className="text-center">Arabic Name</th>
              <th className="text-center">English Name</th>
              <th className="text-center">Category</th>
              <th className="text-center">Price</th>
              <th className="text-center">Size</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.id} style={{ animationDelay: `${index * 0.05}s` }} className="table-row-animated">
                <td className="text-center align-middle">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.nameAr} 
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  ) : (
                    <div style={{ width: '50px', height: '50px', background: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                      <i className="bi bi-image"></i>
                    </div>
                  )}
                </td>
                <td className="text-center align-middle"><strong>{item.nameAr}</strong></td>
                <td className="text-center align-middle">{item.nameEn}</td>
                <td className="text-center align-middle">
                  <span className="badge bg-info">
                    {getCategoryName(item.categoryId)}
                  </span>
                </td>
                <td className="text-center align-middle"><strong>{formatPrice(item.price)}</strong></td>
                <td className="text-center align-middle">
                  {item.size && (
                    <span className="badge bg-secondary">{item.size}</span>
                  )}
                </td>
                <td className="text-center align-middle">
                  <div className="d-flex gap-2 justify-content-center">
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
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  <i className="bi bi-inbox" style={{ fontSize: '2rem', color: '#ccc' }}></i>
                  <p className="text-muted mt-2">
                    {searchTerm || selectedCategory ? 'No items match your filters' : 'No items found'}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="text-muted">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredItems.length)} of {filteredItems.length} items
            {(searchTerm || selectedCategory) && ` (filtered from ${items.length} total)`}
          </div>
          
          <nav>
            <ul className="pagination mb-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
              </li>

              {getPageNumbers().map((page, index) => (
                <li 
                  key={index} 
                  className={`page-item ${page === currentPage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
                >
                  <button 
                    className="page-link" 
                    onClick={() => handlePageChange(page)}
                    disabled={page === '...'}
                  >
                    {page}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default ItemsTable;