import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Header from './Header';

it('should render header', async () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );

  const links = screen.getAllByRole('link');
  const blog = screen.getByRole('link', { name: /blog/i });
  const posts = screen.getByRole('link', { name: /posts/i });
  const about = screen.getByRole('link', { name: /about/i });
  const contact = screen.getByRole('link', { name: /contact/i });

  expect(links.length).toBe(4);
  expect(blog).toBeInTheDocument();
  expect(posts).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(contact).toBeInTheDocument();
});
