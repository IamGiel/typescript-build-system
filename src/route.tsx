import './styles.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PepComponent } from './shared';
import { Matchory } from './shared/matchory/Matchory';
import { App } from './App';
import { Searchv1 } from './shared/searchv1/Searchv1';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/pep',
    element: <PepComponent stateToRender={'Default State'} />,
  },
  {
    path: '/matchory',
    element: <Matchory stateToRender={'Default State'} />,
  },
  {
    path: '/searchv1',
    element: <Searchv1 />,
  },
]);

const domNode = document.getElementById('root');
const root = createRoot(domNode);

// root.render(<App />);
root.render(
  <React.StrictMode>
    <div className="router flex mx-[119px] my-[112px]">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
