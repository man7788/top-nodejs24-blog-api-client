import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Footer from './Footer';

it('should render footer', async () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );

  const links = screen.getAllByRole('link');
  const blog = screen.getByRole('link', { name: /blog/i });
  const about = screen.getByRole('link', { name: /about/i });
  const contact = screen.getByRole('link', { name: /contact/i });
  const rights = screen.getByText(/all rights reserved/i);

  expect(links.length).toBe(3);
  expect(blog).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(contact).toBeInTheDocument();
  expect(rights).toBeInTheDocument();
});
