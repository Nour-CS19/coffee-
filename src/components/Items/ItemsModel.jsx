import React, { useState, useEffect } from 'react';
import Modal from '../Common/Modal';
import Input from '../Common/Input';
import Button from '../Common/Button';
import { useItems } from '../../hooks/useItems';
import { useApp } from '../../context/AppContext';
import { validateItem } from '../../utils/validation';
import { DEFAULT_ITEM } from '../../utils/constants';
import { uploadImage } from '../../firebase/services';

const ItemModal = ({ isOpen, onClose, item }) => {
  const [formData, setFormData] = useState(DEFAULT_ITEM);
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { addItem, updateItem, loading } = useItems();
  const { categories } = useApp();

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData(DEFAULT_ITEM);
    }
    setErrors({});
    setImageFile(null);
  }, [item, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateItem(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      setUploading(true);
      let imageUrl = formData.image;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile, 'items');
      }

      const dataToSave = { ...formData, image: imageUrl };

      if (item) {
        await updateItem(item.id, dataToSave);
      } else {
        await addItem(dataToSave);
      }

      onClose();
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={item ? 'Edit Item' : 'Add Item'}
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label className="form-label">
                Category <span className="text-danger">*</span>
              </label>
              <select
                name="categoryId"
                className={`form-control ${errors.categoryId ? 'is-invalid' : ''}`}
                value={formData.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} - {cat.nameEn}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <div className="invalid-feedback">{errors.categoryId}</div>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <Input
              label="Size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="S, M, L, etc."
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Input
              label="Arabic Name"
              name="nameAr"
              value={formData.nameAr}
              onChange={handleChange}
              error={errors.nameAr}
              required
            />
          </div>

          <div className="col-md-6">
            <Input
              label="English Name"
              name="nameEn"
              value={formData.nameEn}
              onChange={handleChange}
              error={errors.nameEn}
              required
            />
          </div>
        </div>

        <Input
          label="Price (EGP)"
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          error={errors.price}
          required
        />

        <div className="form-group mb-3">
          <label className="form-label">Current Image URL</label>
          <Input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Or enter image URL"
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Upload New Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imageFile && (
            <small className="text-success">
              Selected: {imageFile.name}
            </small>
          )}
        </div>

        {formData.image && (
          <div className="mb-3">
            <img 
              src={formData.image} 
              alt="Preview" 
              style={{ maxWidth: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
            />
          </div>
        )}

        {errors.submit && (
          <div className="alert alert-danger">{errors.submit}</div>
        )}

        <div className="d-flex gap-2">
          <Button 
            type="submit" 
            variant="primary"
            disabled={loading || uploading}
          >
            {uploading ? 'Uploading...' : loading ? 'Saving...' : 'Save'}
          </Button>
          <Button 
            type="button" 
            variant="secondary"
            onClick={onClose}
            disabled={loading || uploading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ItemModal;