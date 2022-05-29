/* eslint-disable no-shadow */
import React from 'react';
import 'normalize.css';
import Dashboard from './components/Dashboard';
import NavBar from './components/Navbar';

function App() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar />
      <Dashboard />
    </div>

  );
}

export default App;
