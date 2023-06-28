import './styles.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PepComponent } from './shared';
import { Matchory } from './shared/matchory/Matchory';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
  },
  {
    path: '/pep',
    element: <PepComponent stateToRender={'Default State'} />,
  },
  {
    path: '/matchory',
    element: <Matchory stateToRender={'Default State'} />,
  },
]);

const domNode = document.getElementById('root');
const root = createRoot(domNode);

// root.render(<App />);
root.render(
  <React.StrictMode>
    <div className="flex m-[119px]">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
