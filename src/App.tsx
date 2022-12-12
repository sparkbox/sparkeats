import { Outlet } from 'react-router-dom';
import './App.scss';
import { SiteHeader } from './components/SiteHeader';

export function App() {
  return (
    <>
      <SiteHeader />
      <Outlet />
    </>
  );
}
