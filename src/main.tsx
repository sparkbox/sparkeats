// React
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Sparkeats
import { App } from './App';
import { HomePage } from './components/HomePage';
import { LocationPage } from './components/LocationPage';
import { NewLocationPage } from './components/NewLocationPage';
import { NewReviewPage } from './components/NewReviewPage';

window.__SPARKEATS_VERSION__ = import.meta.env['VITE_SPARKEATS_VERSION'];

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename={`${import.meta.env['BASE_URL']}`}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/locations/:id" element={<LocationPage />} />
          <Route path="/locations/new" element={<NewLocationPage />} />
          <Route path="/reviews/new" element={<NewReviewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
