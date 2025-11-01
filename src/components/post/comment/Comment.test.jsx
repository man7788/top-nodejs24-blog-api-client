import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import Comment from './Comment';
import * as useComments from '../../../hooks/useComments';
import postComment from '../../../api/postComment';

const useCommentsSpy = vi.spyOn(useComments, 'default');
const fetchSpy = vi.spyOn(global, 'fetch');

vi.mock('../../../api/postComment');

afterEach(() => {
  vi.clearAllMocks();
});

describe('Comment component', async () => {
  it('should render loading', async () => {
    useCommentsSpy.mockReturnValue({
      comments: null,
      error: null,
      loading: true,
    });

    render(
      <MemoryRouter>
        <Comment postId={1} />
      </MemoryRouter>,
    );

    const loading = screen.getByRole('heading', { name: /loading/i });

    expect(loading).toBeInTheDocument();
    expect(loading.textContent).toMatch(/loading/i);
  });

  it('should render error', async () => {
    useCommentsSpy.mockReturnValue({
      comments: null,
      error: true,
      loading: false,
    });

    render(
      <MemoryRouter>
        <Comment postId={1} />
      </MemoryRouter>,
    );

    const error = screen.getByRole('heading', { name: /error/i });

    expect(error).toBeInTheDocument();
    expect(error.textContent).toMatch(/a network error was encountered/i);
  });

  it('should render no comments yet', async () => {
    useCommentsSpy.mockReturnValue({
      comment: [],
      error: null,
      loading: false,
    });

    const { container } = render(
      <MemoryRouter>
        <Comment postId={1} />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render comments', async () => {
    const comments = [
      {
        id: 1,
        name: 'foobar',
        email: 'foo@bar.com',
        content: 'Post comment 1',
        createdAt: '2025-01-01T00:00:00Z',
        postId: 1,
      },
      {
        id: 2,
        name: 'foobar',
        email: 'foo@bar.com',
        content: 'Post comment 2',
        createdAt: '2025-01-01T00:00:00Z',
        postId: 1,
      },
    ];

    useCommentsSpy.mockReturnValue({
      comments,
      error: null,
      loading: false,
    });

    const { container } = render(
      <MemoryRouter>
        <Comment postId={1} />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should update comments after form submission', async () => {
    const user = userEvent.setup();

    const commentsLengthOne = [
      {
        id: 1,
        name: 'foobar',
        email: 'foo@bar.com',
        content: 'Post comment 1',
        createdAt: '2025-01-01T00:00:00Z',
        postId: 1,
      },
    ];

    const commentsLengthTwo = [
      {
        id: 1,
        name: 'foobar',
        email: 'foo@bar.com',
        content: 'Post comment 1',
        createdAt: '2025-01-01T00:00:00Z',
        postId: 1,
      },
      {
        id: 2,
        name: 'foobar',
        email: 'foo@bar.com',
        content: 'Post comment 2',
        createdAt: '2025-01-01T00:00:00Z',
        postId: 1,
      },
    ];

    useCommentsSpy.mockRestore();

    fetchSpy
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ data: { comments: commentsLengthOne } }),
        status: 200,
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ data: { comments: commentsLengthTwo } }),
        status: 200,
      });

    postComment.mockReturnValue({ error: null });

    render(
      <MemoryRouter>
        <Comment postId={1} />
      </MemoryRouter>,
    );

    const initialComments = await screen.findAllByRole('article');

    expect(initialComments).toHaveLength(1);

    const inputs = await screen.findAllByRole('textbox');
    const submit = await screen.findByRole('button');

    await user.type(inputs[0], 'foobar');
    await user.type(inputs[1], 'foo@bar.com');
    await user.type(inputs[2], 'Post comment 2');
    await user.click(submit);

    expect(postComment).toHaveBeenCalledWith(
      1,
      'foobar',
      'foo@bar.com',
      'Post comment 2',
    );

    await waitFor(() => {
      const updatedComments = screen.getAllByRole('article');
      expect(updatedComments).toHaveLength(2);
    });
  });
});
