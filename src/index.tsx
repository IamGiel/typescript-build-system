import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PepComponent } from './shared';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
  },
  {
    path: '/pep',
    element: <PepComponent stateToRender={'Default State'} />,
  },
]);

const domNode = document.getElementById('root');
const root = createRoot(domNode);

// root.render(<App />);
root.render(
  <React.StrictMode>
    <div className="flex flex-row justify-center">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
