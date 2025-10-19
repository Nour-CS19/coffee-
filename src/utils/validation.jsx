export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  export const validatePassword = (password) => {
    return password.length >= 6;
  };
  
  export const validateRequired = (value) => {
    return value && value.trim().length > 0;
  };
  
  export const validatePrice = (price) => {
    return !isNaN(price) && parseFloat(price) > 0;
  };
  
  export const validateCategory = (category) => {
    const errors = {};
    
    if (!validateRequired(category.name)) {
      errors.name = 'Arabic name is required';
    }
    
    if (!validateRequired(category.nameEn)) {
      errors.nameEn = 'English name is required';
    }
    
    if (!category.order || category.order < 1) {
      errors.order = 'Order must be greater than 0';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  
  export const validateItem = (item) => {
    const errors = {};
    
    if (!validateRequired(item.nameAr)) {
      errors.nameAr = 'Arabic name is required';
    }
    
    if (!validateRequired(item.nameEn)) {
      errors.nameEn = 'English name is required';
    }
    
    if (!validateRequired(item.categoryId)) {
      errors.categoryId = 'Category is required';
    }
    
    if (!validatePrice(item.price)) {
      errors.price = 'Valid price is required';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };