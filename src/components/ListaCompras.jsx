import React, { useState } from 'react';

const productosIniciales = [
  { id: 1, nombre: "Manzanas Orgánicas", comprado: false, categoria: "Frutas" },
  { id: 2, nombre: "Leche de Avena", comprado: true, categoria: "Lácteos" }
];

function ListaCompras() {
  const [productos] = useState(productosIniciales);

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', background: '#1e293b', padding: '24px', borderRadius: '12px' }}>
      <h2 style={{ color: '#38bdf8', marginBottom: '16px' }}>🛒 Lista de Compras</h2>
      <ul>
        {productos.map(p => (
          <li key={p.id} style={{ color: p.comprado ? '#64748b' : '#f8fafc', padding: '8px 0' }}>
            {p.nombre} ({p.categoria}) {p.comprado ? "✓" : "○"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaCompras;