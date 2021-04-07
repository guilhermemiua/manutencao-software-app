import api from './api';

export const fetchProducts = (company_id): any => {
  return api.get('products', {
    params: {
      company_id,
    },
  });
};
