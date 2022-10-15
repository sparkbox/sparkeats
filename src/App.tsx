import { Outlet } from 'react-router-dom'
import './App.scss'

function App() {
  return (
    <div>
      <header>Site Header</header>
      <Outlet />
    </div>
  )
}

export default App
