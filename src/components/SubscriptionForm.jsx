// src/components/SubscriptionForm.jsx
import React, { useState, useEffect } from 'react';

export const SubscriptionForm = ({ onSave, currentSub }) => {
  const [sub, setSub] = useState({ name: '', price: '', category: '', renewalDate: '' });

  useEffect(() => {
    if (currentSub) {
      setSub(currentSub);
    } else {
      setSub({ name: '', price: '', category: '', renewalDate: '' });
    }
  }, [currentSub]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSub({ ...sub, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(sub);
    setSub({ name: '', price: '', category: '', renewalDate: '' }); // Limpiar formulario
  };

  return (
    <form onSubmit={handleSubmit} className="sub-form">
      <h3>{currentSub ? 'Editar' : 'Agregar'} Suscripción</h3>
      <input name="name" value={sub.name} onChange={handleChange} placeholder="Nombre (ej: Netflix)" required />
      <input name="price" type="number" value={sub.price} onChange={handleChange} placeholder="Costo Mensual" required />
      <input name="category" value={sub.category} onChange={handleChange} placeholder="Categoría" required />
      <input name="renewalDate" type="date" value={sub.renewalDate} onChange={handleChange} required />
      <button type="submit">Guardar</button>
    </form>
  );
};