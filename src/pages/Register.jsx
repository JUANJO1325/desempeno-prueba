// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { checkUserExists, registerUser } from '../services/api';
import Swal from 'sweetalert2';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      // 2. Verificar si el usuario ya existe
      const userExists = await checkUserExists(email);
      if (userExists) {
        setError('El correo electrónico ya está registrado.');
        return;
      }

      // 3. Si no existe, registrarlo
      await registerUser({ email, password });

      // 4. Mostrar mensaje de éxito y redirigir a login
      Swal.fire({
        title: '¡Registro exitoso!',
        text: 'Ahora puedes iniciar sesión con tus credenciales.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      navigate('/login');

    } catch (err) {
      setError('Ocurrió un error durante el registro. Inténtalo de nuevo.');
      console.error(err);
    }
  };

  return (
    <div className="login-container"> {/* Reutilizamos el estilo del login */}
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Crear Cuenta</h2>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Registrarse</button>
        <p className="form-link">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </form>
    </div>
  );
};