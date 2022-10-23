import { Outlet } from 'react-router-dom';
import './App.scss';
import { SiteHeader } from './components/SiteHeader';

function App() {
  return (
    <div>
      <SiteHeader />
      <Outlet />
    </div>
  );
}

export default App;
