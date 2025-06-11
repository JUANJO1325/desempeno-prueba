// src/components/SubscriptionCard.jsx
import React from 'react';

export const SubscriptionCard = ({ sub, onEdit, onDelete }) => {
  return (
    <div className="sub-card">
      <h4>{sub.name}</h4>
      <p><strong>Categoría:</strong> {sub.category}</p>
      <p><strong>Precio:</strong> ${parseFloat(sub.price).toFixed(2)}</p>
      <p><strong>Renovación:</strong> {sub.renewalDate}</p>
      <div className="card-actions">
        <button onClick={() => onEdit(sub)}>Editar</button>
        <button onClick={() => onDelete(sub.id)} className="delete-btn">Eliminar</button>
      </div>
    </div>
  );
};