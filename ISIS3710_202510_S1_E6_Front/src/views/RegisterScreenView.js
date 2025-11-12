import React from 'react';
import Register from '../components/Register';

function RegisterScreenView({ onLogin }) {
  return (
    <div>
      <Register onLogin={onLogin} />
    </div>
  );
}

export default RegisterScreenView;
