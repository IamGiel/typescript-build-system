import './styles.scss';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Ladder, MediaSize, PepComponent } from './shared';
import { Matchory } from './shared/matchory/Matchory';
import { App } from './App';
import { Searchv1 } from './shared/searchv1/Searchv1';
import { JsonPdf } from './shared/json-pdf/jsonPdf';

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
  {
    path: '/ladder',
    element: <Ladder />,
  },
  {
    path: '/jsontopdf',
    element: <JsonPdf />,
  },
]);

const domNode = document.getElementById('root');
const root = createRoot(domNode);

// root.render(<App />);
root.render(
  <React.StrictMode>
    <div className="router flex flex-col justfiy-center lg:flex lg:mx-[119px]">
      {/* lets add a reference if screeen is xl, lg, md sm */}
      <div className="flex justify-center">
        <MediaSize />
      </div>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
