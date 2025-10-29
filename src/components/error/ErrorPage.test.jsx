import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ErrorPage from './ErrorPage';

it('should render error page', async () => {
  const { container } = render(
    <MemoryRouter>
      <ErrorPage />
    </MemoryRouter>,
  );

  expect(container).toMatchSnapshot();
});
