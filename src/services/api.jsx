import { create } from 'apisauce';

const api = create({
  baseURL: 'https://142.93.196.10/api',
});

api.addRequestTransform(request => {
  request.headers['Authorization'] = `Bearer ${localStorage.getItem('@rest:token')}`;
});

api.addResponseTransform(response => {
  if (!response.ok) throw response.data;
});

export default api;
