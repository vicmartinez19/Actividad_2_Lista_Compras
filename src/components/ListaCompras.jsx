import React, { useState, useEffect } from 'react';
import './ListaCompras.css';

const productosPredeterminados = [
  { id: 1, nombre: "Manzanas rojas", categoria: "Frutas", cantidad: 6, comprado: false },
  { id: 2, nombre: "Leche entera", categoria: "Lácteos", cantidad: 2, comprado: true },
  { id: 3, nombre: "Pan integral", categoria: "Panadería", cantidad: 1, comprado: false }
];

function ListaCompras() {
  const [productos, setProductos] = useState(() => {
    const local = localStorage.getItem("lista_compras_react");
    return local ? JSON.parse(local) : productosPredeterminados;
  });

  const [nuevoProducto, setNuevoProducto] = useState("");
  const [categoria, setCategoria] = useState("Frutas");
  const [cantidad, setCantidad] = useState(1);
  const [filtro, setFiltro] = useState("todos");
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    localStorage.setItem("lista_compras_react", JSON.stringify(productos));
  }, [productos]);

  const agregarProducto = (e) => {
    e.preventDefault();
    const nombreLimpio = nuevoProducto.trim();

    if (!nombreLimpio) {
      setMensajeError("⚠️ Por favor ingresa el nombre de un producto.");
      return;
    }

    const existe = productos.some(
      (p) => p.nombre.toLowerCase() === nombreLimpio.toLowerCase()
    );

    if (existe) {
      setMensajeError(`⚠️ "${nombreLimpio}" ya está en tu lista de compras.`);
      return;
    }

    const nuevoItem = {
      id: Date.now(),
      nombre: nombreLimpio,
      categoria: categoria,
      cantidad: Number(cantidad) || 1,
      comprado: false
    };

    setProductos([...productos, nuevoItem]);
    setNuevoProducto("");
    setCantidad(1);
    setMensajeError("");
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  const toggleComprado = (id) => {
    setProductos(
      productos.map((producto) =>
        producto.id === id ? { ...producto, comprado: !producto.comprado } : producto
      )
    );
  };

  const limpiarLista = () => {
    if (window.confirm("¿Seguro que deseas vaciar toda la lista de compras?")) {
      setProductos([]);
    }
  };

  const productosFiltrados = productos.filter((p) => {
    if (filtro === "pendientes") return !p.comprado;
    if (filtro === "comprados") return p.comprado;
    return true;
  });

  const pendientesCount = productos.filter((p) => !p.comprado).length;

  return (
    <div className="compras-container">
      <h2 style={{ fontSize: '1.6rem', marginBottom: '8px', color: '#38bdf8' }}>
        🛒 Lista de Compras Interactiva
      </h2>
      <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '20px' }}>
        Gestión de estado con <code>useState</code>, inmutabilidad y persistencia en <code>localStorage</code>.
      </p>

      <form onSubmit={agregarProducto} className="compras-form">
        <input
          type="text"
          placeholder="Ej. Tomates, Café..."
          value={nuevoProducto}
          onChange={(e) => {
            setNuevoProducto(e.target.value);
            if (mensajeError) setMensajeError("");
          }}
        />

        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="Frutas">🍎 Frutas</option>
          <option value="Verduras">🥦 Verduras</option>
          <option value="Lácteos">🧀 Lácteos</option>
          <option value="Panadería">🍞 Panadería</option>
          <option value="Bebidas">☕ Bebidas</option>
          <option value="Abarrotes">📦 Abarrotes</option>
        </select>

        <input
          type="number"
          min="1"
          max="99"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />

        <button type="submit" className="compras-btn-add">
          + Agregar
        </button>
      </form>

      {mensajeError && (
        <p style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: '14px' }}>
          {mensajeError}
        </p>
      )}

      <div className="compras-filtros">
        <button
          className={`filtro-btn ${filtro === 'todos' ? 'active' : ''}`}
          onClick={() => setFiltro('todos')}
        >
          Todos ({productos.length})
        </button>
        <button
          className={`filtro-btn ${filtro === 'pendientes' ? 'active' : ''}`}
          onClick={() => setFiltro('pendientes')}
        >
          Pendientes ({pendientesCount})
        </button>
        <button
          className={`filtro-btn ${filtro === 'comprados' ? 'active' : ''}`}
          onClick={() => setFiltro('comprados')}
        >
          Comprados ({productos.length - pendientesCount})
        </button>
      </div>

      {productosFiltrados.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#64748b', padding: '30px 0' }}>
          No hay productos en esta vista. ¡Agrega uno arriba!
        </p>
      ) : (
        <ul className="compras-lista">
          {productosFiltrados.map((item) => (
            <li key={item.id} className={`compras-item ${item.comprado ? 'comprado' : ''}`}>
              <div className="item-left">
                <input
                  type="checkbox"
                  checked={item.comprado}
                  onChange={() => toggleComprado(item.id)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div>
                  <span style={{ fontWeight: 600, fontSize: '0.98rem' }}>
                    {item.nombre} <span style={{ color: '#38bdf8' }}>(x{item.cantidad})</span>
                  </span>
                  <div style={{ marginTop: '2px' }}>
                    <span className="item-categoria">{item.categoria}</span>
                  </div>
                </div>
              </div>

              <button
                className="compras-btn-delete"
                onClick={() => eliminarProducto(item.id)}
                title="Eliminar producto"
              >
                ✕ Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="compras-footer">
        <span>{pendientesCount} productos por comprar</span>
        {productos.length > 0 && (
          <button
            onClick={limpiarLista}
            style={{ background: 'transparent', color: '#94a3b8', fontSize: '0.8rem', textDecoration: 'underline' }}
          >
            Vaciar lista
          </button>
        )}
      </div>
    </div>
  );
}

export default ListaCompras;