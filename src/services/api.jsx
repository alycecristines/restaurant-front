import { create } from 'apisauce';

const api = create({
  // baseURL: 'http://localhost:5001/',
  baseURL: 'http://206.189.205.49/api',
});

// api.addRequestTransform(request => {
//   request.headers['Authorization'] = `Bearer ${localStorage.getItem('@rest:token')}`;
// });

api.addResponseTransform(response => {
  if (!response.ok) throw response.data;
});

export default api;
