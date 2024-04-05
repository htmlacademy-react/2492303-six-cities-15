import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus } from '../../const';
import { withHistory } from '../../utils/mock-component';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import { render, screen } from '@testing-library/react';

describe('Component: PrivateRoute', () => {
  const publicRoute = 'public route';
  const privateRoute = 'private route';
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Favorites);
  });

  it('should render component for public route, when user not authorized', () => {
    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{publicRoute}</span>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <span>{privateRoute}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(publicRoute)).toBeInTheDocument();
    expect(screen.queryByText(privateRoute)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{publicRoute}</span>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <span>{privateRoute}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(privateRoute)).toBeInTheDocument();
    expect(screen.queryByText(publicRoute)).not.toBeInTheDocument();
  });
});
