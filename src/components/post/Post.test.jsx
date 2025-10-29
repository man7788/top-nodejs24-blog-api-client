import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Post from './Post';
import usePostDetail from '../../hooks/usePostDetail';

vi.mock('../../hooks/usePostDetail');

afterEach(() => {
  vi.clearAllMocks();
});

describe('Post component', async () => {
  it('should render loading', async () => {
    usePostDetail.mockReturnValue({
      posts: null,
      error: null,
      loading: true,
    });

    render(
      <MemoryRouter>
        <Post />
      </MemoryRouter>,
    );

    const loading = screen.getByRole('heading', { name: /loading/i });

    expect(loading).toBeInTheDocument();
    expect(loading.textContent).toMatch(/loading/i);
  });

  it('should render error', async () => {
    usePostDetail.mockReturnValue({
      posts: null,
      error: true,
      loading: false,
    });

    render(
      <MemoryRouter>
        <Post />
      </MemoryRouter>,
    );

    const error = screen.getByRole('heading', { name: /error/i });

    expect(error).toBeInTheDocument();
    expect(error.textContent).toMatch(/a network error was encountered/i);
  });

  it('should render post page', async () => {
    const comments = [
      {
        id: 1,
        name: 'john doe',
        content: 'Comment 1',
        created: new Date().toISOString(),
      },
      {
        id: 2,
        name: 'jane doe',
        content: 'Comment 2',
        created: new Date().toISOString(),
      },
    ];

    const post = {
      id: 1,
      title: 'Post title 1',
      contnet: 'Post content 1',
      createdAt: new Date().toISOString(),
      comments,
    };

    usePostDetail.mockReturnValue({
      post,
      error: null,
      loading: false,
    });

    const { container } = render(
      <MemoryRouter>
        <Post />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
