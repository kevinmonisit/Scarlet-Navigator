/* eslint-disable no-shadow */
import React from 'react';
import 'normalize.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Dashboard from './Dashboard';
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
