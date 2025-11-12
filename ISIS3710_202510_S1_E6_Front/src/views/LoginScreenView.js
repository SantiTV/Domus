import React from 'react';
import Auth from '../components/Auth';
import PropTypes from 'prop-types';

function LoginScreenView({ onLogin }) {
  return (
    <div> 
      <Auth onLogin={onLogin} />
    </div>

  );
}

LoginScreenView.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginScreenView;