import { useRoutes, Navigate } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import { useEffect, useState } from 'react';

export default function ThemeRoutes() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    setIsAuth(isAuthenticated !== null && isAuthenticated !== 'false');
  }, []);

  const routes = isAuth ? [MainRoutes] : [AuthenticationRoutes];
  const defaultPath = isAuth ? '/dashboard/default' : '/pages/login/login3';
  return useRoutes([...routes, { path: '*', element: <Navigate to={defaultPath} replace /> }]);
}
