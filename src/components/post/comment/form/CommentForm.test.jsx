import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import CommentForm from './CommentForm';
import postComment from '../../../../api/postComment';

vi.mock('../../../../api/postComment');

afterEach(() => {
  vi.clearAllMocks();
});

describe('CommentForm component', async () => {
  it('should render comment form', async () => {
    const { container } = render(
      <MemoryRouter>
        <CommentForm postId={1} update={false} setUpdate={vi.fn()} />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render user input', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CommentForm postId={1} update={false} setUpdate={vi.fn()} />
      </MemoryRouter>,
    );

    const inputs = screen.getAllByRole('textbox');

    await user.type(inputs[0], 'foobar');
    await user.type(inputs[1], 'foo@bar.com');
    await user.type(inputs[2], 'Post comment 1');

    expect(inputs[0].value).toMatch('foobar');
    expect(inputs[1].value).toMatch('foo@bar.com');
    expect(inputs[2].value).toMatch('Post comment 1');
  });

  it('should render user input validation failed', async () => {
    const user = userEvent.setup();

    postComment.mockReturnValue({
      error: {
        details: [
          {
            field: 'name',
            message: 'Name must between 5 to 255 characters.',
          },
          {
            field: 'email',
            message: 'Email must not be empty.',
          },
          {
            field: 'content',
            message: 'Content must not be empty.',
          },
        ],
      },
    });

    render(
      <MemoryRouter>
        <CommentForm postId={1} update={false} setUpdate={vi.fn()} />
      </MemoryRouter>,
    );

    const submit = screen.getByRole('button');

    await user.click(submit);

    const nameErr = screen.getByText('Name must between 5 to 255 characters.');
    const EmailErr = screen.getByText('Email must not be empty.');
    const ContentErr = screen.getByText('Content must not be empty.');

    expect(nameErr.textContent).toMatch(
      'Name must between 5 to 255 characters.',
    );
    expect(EmailErr.textContent).toMatch('Email must not be empty.');
    expect(ContentErr.textContent).toMatch('Content must not be empty.');
  });

  it('should sumbmit comment form', async () => {
    const user = userEvent.setup();

    const setUpdate = vi.fn();

    postComment.mockReturnValue({ error: null });

    render(
      <MemoryRouter>
        <CommentForm postId={1} update={false} setUpdate={setUpdate} />
      </MemoryRouter>,
    );

    const inputs = screen.getAllByRole('textbox');
    const submit = screen.getByRole('button');

    await user.type(inputs[0], 'foobar');
    await user.type(inputs[1], 'foo@bar.com');
    await user.type(inputs[2], 'Post comment 1');

    expect(inputs[0].value).toMatch('foobar');
    expect(inputs[1].value).toMatch('foo@bar.com');
    expect(inputs[2].value).toMatch('Post comment 1');
    await user.click(submit);

    expect(setUpdate).toHaveBeenCalledWith(true); // setUpdate(!false)
    expect(postComment).toHaveBeenCalledWith(
      1,
      'foobar',
      'foo@bar.com',
      'Post comment 1',
    );
    expect(inputs[0].value).toMatch('');
    expect(inputs[1].value).toMatch('');
    expect(inputs[2].value).toMatch('');
  });
});
