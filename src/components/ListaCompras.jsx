import React, { useState } from 'react';

const productosIniciales = [
  { id: 1, nombre: "Manzanas Orgánicas", comprado: false, categoria: "Frutas" }
];

function ListaCompras() {
  const [productos, setProductos] = useState(productosIniciales);
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('General');
  const [error, setError] = useState('');

  const agregarProducto = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    const existe = productos.some(p => p.nombre.toLowerCase() === nombre.trim().toLowerCase());
    if (existe) {
      setError("⚠️ Este producto ya está en tu lista de compras.");
      return;
    }

    const nuevo = {
      id: Date.now(),
      nombre: nombre.trim(),
      comprado: false,
      categoria
    };

    setProductos([...productos, nuevo]);
    setNombre('');
    setError('');
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', background: '#1e293b', padding: '24px', borderRadius: '12px' }}>
      <h2 style={{ color: '#38bdf8', marginBottom: '16px' }}>🛒 Lista de Compras</h2>
      <form onSubmit={agregarProducto} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del producto"
          style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #334155' }}
        />
        <button type="submit" style={{ background: '#0284c7', color: 'white', padding: '8px 14px', border: 'none', borderRadius: '6px' }}>
          Agregar
        </button>
      </form>
      {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: '12px' }}>{error}</p>}
      <ul>
        {productos.map(p => (
          <li key={p.id} style={{ display: 'flex', justifyContent: 'space-between', color: '#f8fafc', padding: '8px 0', borderBottom: '1px solid #334155' }}>
            <span>{p.nombre} ({p.categoria})</span>
            <button onClick={() => eliminarProducto(p.id)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaCompras;