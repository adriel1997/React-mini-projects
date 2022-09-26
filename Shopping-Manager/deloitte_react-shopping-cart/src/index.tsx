import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/authContext';

import './main.css';
import routes from './routes';

const container = document.getElementById('root');

// 1. first letter of the component Name should be capital letter
// 2. component will return only single element
// 3. style should be object and property name should be camelcase;
// 4. instead of class have to use classname

if (container) {
  const root = createRoot(container);

  root.render(
    <Suspense
      fallback={
        <h1 className="h-screen flex justify-center items-center text-5xl font-semibold text-red-500">
          Loading...
        </h1>
      }
    >
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </Suspense>,
  );
}
