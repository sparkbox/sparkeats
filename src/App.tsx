import { Outlet } from 'react-router-dom'
import './App.scss'

function App() {
  return (
    <div className="homepage">
      <header>Sparkeats Header</header>
      <Outlet />
    </div>
  )
}

export default App
