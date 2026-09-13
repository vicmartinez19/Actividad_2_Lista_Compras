import React from 'react';
import ListaCompras from './components/ListaCompras.jsx'

function App() {
  return (
    <div style={{ padding: '40px 20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'inline-block', padding: '6px 14px', background: '#10b981', color: '#fff', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '12px' }}>
          MÓDULO 4: ACTIVIDAD 2
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '8px' }}>
          Manejo de Estado con <code>useState</code>
        </h1>
        <p style={{ color: '#94a3b8', maxWidth: '550px' }}>
          Aprende a actualizar colecciones en el estado manteniendo la inmutabilidad de JavaScript y sincronizando con <code>localStorage</code>.
        </p>
      </header>

      <ListaCompras />

      <footer style={{ marginTop: '50px', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
        React + Vite + GitHub Pages | Estado Inmutable con Spread Operator
      </footer>
    </div>
  );
}

export default App;