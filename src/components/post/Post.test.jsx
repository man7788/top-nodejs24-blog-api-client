import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Post from './Post';
import usePostDetail from '../../hooks/usePostDetail';
import useComments from '../../hooks/useComments';

vi.mock('../../hooks/usePostDetail');
vi.mock('../../hooks/useComments');

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
        createdAt: '2025-01-01T00:00:00Z',
      },
      {
        id: 2,
        name: 'jane doe',
        content: 'Comment 2',
        createdAt: '2025-01-01T00:00:00Z',
      },
    ];

    const post = {
      id: 1,
      title: 'Post title 1',
      content: 'Post content 1',
      createdAt: '2025-01-01T00:00:00Z',
      comments,
    };

    usePostDetail.mockReturnValue({
      post,
      error: null,
      loading: false,
    });

    useComments.mockReturnValue({
      comments,
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
