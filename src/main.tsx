import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<div>Locations</div>} />
          <Route path="/locations/:id" element={<div>Location</div>} />
          <Route path="/locations/new" element={<div>Add Location</div>} />
          <Route path="/reviews/new" element={<div>Add Review</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
