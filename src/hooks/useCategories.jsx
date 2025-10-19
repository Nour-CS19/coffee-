import { useState } from 'react';
import { 
  addCategory as addCategoryService, 
  updateCategory as updateCategoryService, 
  deleteCategory as deleteCategoryService 
} from '../firebase/services';
import { useApp } from '../context/AppContext';

export const useCategories = () => {
  const { refreshData } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addCategory = async (categoryData) => {
    setLoading(true);
    setError(null);
    try {
      await addCategoryService(categoryData);
      await refreshData();
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id, categoryData) => {
    setLoading(true);
    setError(null);
    try {
      await updateCategoryService(id, categoryData);
      await refreshData();
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCategoryService(id);
      await refreshData();
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    addCategory,
    updateCategory,
    deleteCategory,
    loading,
    error
  };
};