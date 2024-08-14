import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TodaySales from './components/TodaySales';
import SalesComparison from './components/SalesComparison';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="dashboard-container">
        <nav className="navbar">
          
          <h3 id='navhead'><Link to="/">Today's Sales</Link></h3>  
          <h3 id="navhead"><Link to="/comparison">Sales Comparison</Link></h3>
          
        </nav>

        <Routes>
          <Route path="/" element={<TodaySales />} />
          <Route path="/comparison" element={<SalesComparison />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;