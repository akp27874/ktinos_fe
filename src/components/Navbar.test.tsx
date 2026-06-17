import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Navbar from './Navbar';
import { useAuthContext } from '../context/AuthContext';

vi.mock('../context/AuthContext', () => ({
  useAuthContext: vi.fn(),
}));

const mockedUseAuth = vi.mocked(useAuthContext);

const renderNavbar = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <Navbar />
    </MemoryRouter>,
  );

describe('Navbar', () => {
  beforeEach(() => {
    mockedUseAuth.mockReturnValue({ isLoggedIn: false, isLoading: false, user: null });
  });

  it('shows the login action for guest users on the home page', () => {
    renderNavbar();

    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('hides the login action for logged-in users', () => {
    mockedUseAuth.mockReturnValue({ isLoggedIn: true, isLoading: false, user: { id: '123', email: 'test@example.com' } });

    renderNavbar();

    expect(screen.queryByRole('button', { name: /login/i })).not.toBeInTheDocument();
  });
});
