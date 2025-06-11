// src/pages/Dashboard.jsx (versión final y modular)
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSubscriptions, addSubscription, updateSubscription, deleteSubscription } from '../services/api';
import Swal from 'sweetalert2';
import { SubscriptionForm } from '../components/SubscriptionForm';
import { SubscriptionList } from '../components/SubscriptionList';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [filteredSubs, setFilteredSubs] = useState([]);
  const [editingSub, setEditingSub] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadSubscriptions = async () => {
      if (user) {
        try {
          const data = await getSubscriptions(user.id);
          setSubscriptions(data);
          setFilteredSubs(data);
        } catch (error) {
          console.error(error);
          Swal.fire('Error', 'No se pudieron cargar las suscripciones.', 'error');
        }
      }
    };
    loadSubscriptions();
  }, [user]);

  useEffect(() => {
    const filtered = subscriptions.filter(sub =>
      sub.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubs(filtered);
  }, [searchTerm, subscriptions]);

  const handleSave = async (subData) => {
    try {
      let updatedSubs;
      if (editingSub) {
        const updated = await updateSubscription(editingSub.id, { ...subData, price: parseFloat(subData.price), userId: user.id });
        updatedSubs = subscriptions.map(s => (s.id === editingSub.id ? updated : s));
      } else {
        const newSub = await addSubscription({ ...subData, price: parseFloat(subData.price), userId: user.id });
        updatedSubs = [...subscriptions, newSub];
      }
      setSubscriptions(updatedSubs);
      setEditingSub(null);
      Swal.fire('¡Éxito!', `Suscripción ${editingSub ? 'actualizada' : 'agregada'} correctamente.`, 'success');
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar la suscripción.', 'error');
    }
  };

  const handleEdit = (sub) => {
    setEditingSub(sub);
    window.scrollTo(0, 0); // Scroll hacia arriba para ver el formulario
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡eliminar!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteSubscription(id);
        setSubscriptions(subscriptions.filter(s => s.id !== id));
        Swal.fire('¡Eliminado!', 'Tu suscripción ha sido eliminada.', 'success');
      }
    });
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Hola, ¡Bienvenido!</h1>
        <button onClick={logout}>Cerrar Sesión</button>
      </header>

      <main>
        <div className="form-section">
          <SubscriptionForm onSave={handleSave} currentSub={editingSub} />
        </div>

        <div className="list-section">
          <h2>Tus Suscripciones</h2>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SubscriptionList
            subscriptions={filteredSubs}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </main>
    </div>
  );
};