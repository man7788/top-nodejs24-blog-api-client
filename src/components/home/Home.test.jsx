import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Home from './Home';
import usePostList from '../../hooks/usePostList';

vi.mock('../../hooks/usePostList');

afterEach(() => {
  vi.clearAllMocks();
});

describe('Home component', async () => {
  it('should render loading', async () => {
    usePostList.mockReturnValue({
      posts: null,
      error: null,
      loading: true,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const loading = screen.getByRole('heading', { name: /loading/i });

    expect(loading).toBeInTheDocument();
    expect(loading.textContent).toMatch(/loading/i);
  });

  it('should render error', async () => {
    usePostList.mockReturnValue({
      posts: null,
      error: true,
      loading: false,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const error = screen.getByRole('heading', { name: /error/i });

    expect(error).toBeInTheDocument();
    expect(error.textContent).toMatch(/a network error was encountered/i);
  });

  it('should render a list of posts', async () => {
    const posts = [
      { id: 1, title: 'Post title 1', createdAt: new Date().toISOString() },
      { id: 2, title: 'Post title 2', createdAt: new Date().toISOString() },
    ];

    usePostList.mockReturnValue({
      posts,
      error: null,
      loading: false,
    });

    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const list = screen.getAllByRole('listitem', /post title/i);

    expect(list.length).toBe(2);
    expect(container).toMatchSnapshot();
  });
});
