import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import { SiteHeader } from './components/SiteHeader';
import { HomePage } from './components/HomePage';
import { LocationPage } from './components/LocationPage';
import { NewLocationPage } from './components/NewLocationPage';
import { NewReviewPage } from './components/NewReviewPage';
import { AuthProvider, useProvideAuth } from './auth';

export function App() {
  const auth = useProvideAuth();

  return (
    <AuthProvider value={auth}>
      <Router basename={`${import.meta.env['BASE_URL']}`}>
        <SiteHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/locations/:id" element={<LocationPage />} />
          <Route path="/locations/new" element={<NewLocationPage />} />
          <Route path="/reviews/new" element={<NewReviewPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
