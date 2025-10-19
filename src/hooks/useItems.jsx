import { useState } from 'react';
import { 
  addItem as addItemService, 
  updateItem as updateItemService, 
  deleteItem as deleteItemService 
} from '../firebase/services';
import { useApp } from '../context/AppContext';

export const useItems = () => {
  const { refreshData } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addItem = async (itemData) => {
    setLoading(true);
    setError(null);
    try {
      await addItemService(itemData);
      await refreshData();
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id, itemData) => {
    setLoading(true);
    setError(null);
    try {
      await updateItemService(id, itemData);
      await refreshData();
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteItemService(id);
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
    addItem,
    updateItem,
    deleteItem,
    loading,
    error
  };
};

