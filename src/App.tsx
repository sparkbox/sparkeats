import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="">hello sparkeats</div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/contact'>Contact</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<div>Home</div>}/>
        <Route path='/about' element={<div>About</div>}/>
        <Route path='/contact' element={<div>Contact page</div>}/>
      </Routes>

    </Router>
  )
}

export default App
