import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import JobList from './pages/JobList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-job" element={<AddJob />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/edit-job/:id" element={<AddJob />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
