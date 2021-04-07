import api from './api';

export const getAll = (): any => {
  return api.request({
    method: 'GET',
    url: 'orders?type=user',
  });
};

export const create = (data): any => {
  return api.request({
    method: 'POST',
    url: 'orders',
    data,
  });
};
