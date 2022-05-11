/* eslint-disable no-shadow */
import React from 'react';
import 'normalize.css';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'right'
    }}
    >
      <Dashboard />
    </div>
  );
}

export default App;
