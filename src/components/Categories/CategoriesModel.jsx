import React, { useState, useEffect } from 'react';
import Modal from '../Common/Modal';
import Input from '../Common/Input';
import Button from '../Common/Button';
import { useCategories } from '../../hooks/useCategories';
import { validateCategory } from '../../utils/validation';
import { DEFAULT_CATEGORY } from '../../utils/constants';
import { uploadImage } from '../../firebase/services';

const CategoryModal = ({ isOpen, onClose, category }) => {
  const [formData, setFormData] = useState(DEFAULT_CATEGORY);
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { addCategory, updateCategory, loading } = useCategories();

  useEffect(() => {
    if (category) {
      setFormData(category);
    } else {
      setFormData(DEFAULT_CATEGORY);
    }
    setErrors({});
    setImageFile(null);
  }, [category, isOpen]);

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
    
    const validation = validateCategory(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      setUploading(true);
      let imageUrl = formData.image;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile, 'categories');
      }

      const dataToSave = { ...formData, image: imageUrl };

      if (category) {
        await updateCategory(category.id, dataToSave);
      } else {
        await addCategory(dataToSave);
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
      title={category ? 'Edit Category' : 'Add Category'}
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Arabic Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        
        <Input
          label="English Name"
          name="nameEn"
          value={formData.nameEn}
          onChange={handleChange}
          error={errors.nameEn}
          required
        />
        
        <Input
          label="Order"
          name="order"
          type="number"
          value={formData.order}
          onChange={handleChange}
          error={errors.order}
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

export default CategoryModal;
