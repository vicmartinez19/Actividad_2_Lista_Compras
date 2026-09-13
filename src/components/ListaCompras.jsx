import React, { useState } from 'react';

const productosIniciales = [
  { id: 1, nombre: "Manzanas Orgánicas", comprado: false, categoria: "Frutas" }
];

function ListaCompras() {
  const [productos, setProductos] = useState(productosIniciales);
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('General');

  const agregarProducto = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    const nuevo = {
      id: Date.now(),
      nombre: nombre.trim(),
      comprado: false,
      categoria
    };

    setProductos([...productos, nuevo]);
    setNombre('');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', background: '#1e293b', padding: '24px', borderRadius: '12px' }}>
      <h2 style={{ color: '#38bdf8', marginBottom: '16px' }}>🛒 Lista de Compras</h2>
      <form onSubmit={agregarProducto} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del producto"
          style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #334155' }}
        />
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)} style={{ padding: '8px' }}>
          <option value="General">General</option>
          <option value="Frutas">Frutas</option>
          <option value="Lácteos">Lácteos</option>
        </select>
        <button type="submit" style={{ background: '#0284c7', color: 'white', padding: '8px 14px', border: 'none', borderRadius: '6px' }}>
          Agregar
        </button>
      </form>
      <ul>
        {productos.map(p => (
          <li key={p.id} style={{ color: '#f8fafc', padding: '6px 0' }}>
            {p.nombre} - <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{p.categoria}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaCompras;