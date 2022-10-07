import React from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import HomePage from './components/HomePage';
import { locations } from './locations';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename={`${import.meta.env['BASE_URL']}`}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<HomePage locations={locations} />} />
          <Route path="/locations/:id" element={<div>Location Page</div>} />
          <Route path="/locations/new" element={<div>New Location Page</div>} />
          <Route path="/reviews/new" element={<div>New Review Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
