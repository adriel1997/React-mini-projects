import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ProductsProvider } from './context/productsContext';
// import AuthLayout from './layout/authLayout';
import MainLayout from './layout/mainLayout';
import Home from './pages/home';
import NotFound from './pages/notFound';
import ProductDetails from './pages/productDetails';
// import Login from './pages/login';
// import Register from './pages/register';

// const MainLayout = lazy(() => import('./layout/mainLayout'));
const AuthLayout = lazy(() => import('./layout/authLayout'));
// const Home = lazy(() => import('./pages/home'));
const Login = lazy(() => import('./pages/login'));
const Register = lazy(() => import('./pages/register'));

export default createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/:productId',
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
