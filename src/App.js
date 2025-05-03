import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Video from './pages/Video';
import Search from './pages/Search';
import Upload from './pages/Upload';
import Login from './pages/Login';
import Register from './pages/Register';
import Channel from './pages/Channel';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video/:id" element={<Video />} />
            <Route path="/search" element={<Search />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/channel/:id" element={<Channel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
