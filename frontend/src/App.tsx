/* eslint-disable no-shadow */
import React from 'react';
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
      <div style={{
        width: '20%',
        height: '100%'
      }}
      >
        Test
      </div>
    </div>
  );
}

export default App;
