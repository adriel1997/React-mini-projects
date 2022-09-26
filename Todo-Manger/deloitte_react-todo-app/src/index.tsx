import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

import './main.css';

const container = document.getElementById('root');

// 1. first letter of the component Name should be capital letter
// 2. component will return only single element
// 3. style should be object and property name should be camelcase;
// 4. instead of class have to use classname

if (container) {
  const root = createRoot(container);

  root.render(<App />);
}
