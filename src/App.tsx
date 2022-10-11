import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="App homepage">
      <header>Sparkeats Header</header>
      <Outlet />
    </div>
  )
}

export default App
