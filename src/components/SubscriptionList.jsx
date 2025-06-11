// src/components/SubscriptionList.jsx
import React from 'react';
import { SubscriptionCard } from './SubscriptionCard';

export const SubscriptionList = ({ subscriptions, onEdit, onDelete }) => {
  if (subscriptions.length === 0) {
    return <p>No tienes suscripciones registradas</p>;
  }

  return (
    <div className="sub-list">
      {subscriptions.map(sub => (
        <SubscriptionCard key={sub.id} sub={sub} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};