import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import Comment from './Comment';
import useComments from '../../../hooks/useComments';
import postComment from '../../../api/postComment';

vi.mock('../../../hooks/useComments');
vi.mock('../../../api/postComment');

afterEach(() => {
  vi.clearAllMocks();
});

describe('Comment component', async () => {
  it('should render loading', async () => {
    useComments.mockReturnValue({
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
    useComments.mockReturnValue({
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
    useComments.mockReturnValue({
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

    useComments.mockReturnValue({
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

    const comments = [
      {
        id: 1,
        name: 'foobar',
        email: 'foo@bar.com',
        content: 'Post comment 1',
        createdAt: '2025-01-01T00:00:00Z',
        postId: 1,
      },
    ];

    const setUpdate = vi.fn();

    useComments.mockReturnValue({
      comments,
      error: null,
      loading: false,
      update: false,
      setUpdate,
    });

    postComment.mockReturnValue({ error: null });

    render(
      <MemoryRouter>
        <Comment postId={1} />
      </MemoryRouter>,
    );

    const inputs = screen.getAllByRole('textbox');
    const submit = screen.getByRole('button');

    await user.type(inputs[0], 'foobar');
    await user.type(inputs[1], 'foo@bar.com');
    await user.type(inputs[2], 'Post comment 2');
    await user.click(submit);

    // setUpdate() should call { update } from useComment() hook
    expect(setUpdate).toHaveBeenCalledWith(true); // setUpdate(!false)
    // postId props from <Comment /> should pass to form submit payload
    expect(postComment).toHaveBeenCalledWith(
      1,
      'foobar',
      'foo@bar.com',
      'Post comment 2',
    );
  });
});
