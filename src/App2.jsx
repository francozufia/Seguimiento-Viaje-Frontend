import React from 'react';
import App from './App.jsx';
import ChatComponent from './ChatComponent.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const App2 = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <div style={{ flex: 1, width: '80%', margin: 0, padding: 0 }}>
        <App />
      </div>
      <div style={{ width: '20%', margin: 0, padding: 0 }}>
        {/* Contenedor vacío para reservar espacio para el chat */}
      </div>
      <div style={{ position: 'fixed', right: 0, width: '20%', height: '100%', borderLeft: '1px solid #ccc', margin: 0, padding: 0,  overflowY: 'auto' }}>
        <ChatComponent />
      </div>
    </div>
  );
};

export default App2;
