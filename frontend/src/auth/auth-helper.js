import { logout } from './api-auth';

export const authenticate = (jwt, cb) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('jwt', JSON.stringify(jwt));
  }
  cb();
};
export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (sessionStorage.getItem('jwt')) {
    return JSON.parse(sessionStorage.getItem('jwt'));
  }
  return false;
};
// Optional if you use cookies
export const clearJWT = (cb) => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('jwt');
  }
  logout().then(() => {
    document.cookie = 't=; expires=Thu, 1 Jan 1970 00:00:00 UTC; path=/;';
  });
  cb();
};
