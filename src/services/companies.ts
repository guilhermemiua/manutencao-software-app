import api from './api';

export const fetchCompanies = (company_category_id: any): any => {
  return api.get('companies', {
    params: {
      company_category_id,
    },
  });
};

export const fetchCategories = (): any => {
  return api.get('company-categories');
};
