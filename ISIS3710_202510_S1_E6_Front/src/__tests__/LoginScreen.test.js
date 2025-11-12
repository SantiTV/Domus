import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginScreenView from '../views/LoginScreenView';

jest.mock('axios');

describe('LoginScreenView', () => {
  it('debe renderizar el componente Auth', () => {
    const mockLogin = jest.fn();
    render(
      <MemoryRouter>
        <LoginScreenView onLogin={mockLogin} />
      </MemoryRouter>
    );
  });

});
