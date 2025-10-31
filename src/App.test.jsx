import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider, useParams } from 'react-router';
import userEvent from '@testing-library/user-event';

import routes from './routes/routes';
import usePostList from './hooks/usePostList';
import usePostDetail from './hooks/usePostDetail';

vi.mock('./hooks/usePostList');
vi.mock('./hooks/usePostDetail');
vi.mock('./hooks/useComments', () => ({
  default: vi.fn().mockReturnValue({
    comments: [
      {
        id: 1,
        name: 'john doe',
        content: 'Comment 1',
        createdAt: '2025-01-01T00:00:00Z',
      },
    ],
    error: null,
    loading: false,
  }),
}));

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('App component', async () => {
  const post = {
    id: 1,
    title: 'Post title 1',
    contnet: 'Post content 1',
    createdAt: '2025-01-01T00:00:00Z',
    comments: [],
  };

  const posts = [
    { id: 1, title: 'Post title 1', createdAt: '2025-01-01T00:00:00Z' },
    { id: 2, title: 'Post title 2', createdAt: '2025-01-01T00:00:00Z' },
  ];

  describe('Layout', async () => {
    usePostList.mockReturnValue({
      posts,
      error: null,
      loading: false,
    });

    it('should render the layout of App', async () => {
      const router = createMemoryRouter(routes);

      const { container } = render(<RouterProvider router={router} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('Header', async () => {
    useParams.mockReturnValue({ id: 1 });

    usePostList.mockReturnValue({
      posts,
      error: null,
      loading: false,
    });

    it('should render home page', async () => {
      usePostDetail.mockReturnValue({
        post,
        error: null,
        loading: false,
      });

      const user = userEvent.setup();

      const router = createMemoryRouter(routes, {
        initialEntries: ['/posts/1'],
      });

      const { container } = render(<RouterProvider router={router} />);

      const blog = screen.getAllByRole('link', { name: /blog/i });

      expect(blog[0].parentElement.parentElement.nodeName).toMatch(/header/i);

      await user.click(blog[0]);

      const list = screen.getAllByRole('listitem', /post title/i);

      expect(list.length).toBe(2);
      expect(container).toMatchSnapshot();
    });

    it('should render posts(home) page', async () => {
      usePostDetail.mockReturnValue({
        post,
        error: null,
        loading: false,
      });

      const user = userEvent.setup();

      const router = createMemoryRouter(routes, {
        initialEntries: ['/posts/1'],
      });

      const { container } = render(<RouterProvider router={router} />);

      const postLink = screen.getByRole('link', { name: /posts/i });

      expect(
        postLink.parentElement.parentElement.parentElement.nodeName,
      ).toMatch(/header/i);

      await user.click(postLink);

      const list = screen.getAllByRole('listitem', /post title/i);

      expect(list.length).toBe(2);
      expect(container).toMatchSnapshot();
    });

    it('should render about page', async () => {
      const user = userEvent.setup();

      const router = createMemoryRouter(routes);

      render(<RouterProvider router={router} />);

      const about = screen.getAllByRole('link', { name: /about/i });

      expect(
        about[0].parentElement.parentElement.parentElement.nodeName,
      ).toMatch(/header/i);

      await user.click(about[0]);

      const path = screen.getByText(/\/about/);

      expect(path).toBeInTheDocument();
    });

    it('should render contact page', async () => {
      const user = userEvent.setup();

      const router = createMemoryRouter(routes);

      render(<RouterProvider router={router} />);

      const contact = screen.getAllByRole('link', { name: /contact/i });

      expect(
        contact[0].parentElement.parentElement.parentElement.nodeName,
      ).toMatch(/header/i);

      await user.click(contact[0]);

      const path = screen.getByText(/\/contact/);

      expect(path).toBeInTheDocument();
    });
  });

  describe('Footer', async () => {
    it('should render home page', async () => {
      usePostDetail.mockReturnValue({
        post,
        error: null,
        loading: false,
      });

      const user = userEvent.setup();

      const router = createMemoryRouter(routes, {
        initialEntries: ['/posts/1'],
      });

      const { container } = render(<RouterProvider router={router} />);

      const blog = screen.getAllByRole('link', { name: /blog/i });

      expect(blog[1].parentElement.parentElement.nodeName).toMatch(/footer/i);

      await user.click(blog[1]);

      const list = screen.getAllByRole('listitem', /post title/i);

      expect(list.length).toBe(2);
      expect(container).toMatchSnapshot();
    });

    it('should render about page', async () => {
      const user = userEvent.setup();

      const router = createMemoryRouter(routes);

      render(<RouterProvider router={router} />);

      const about = screen.getAllByRole('link', { name: /about/i });

      expect(about[1].parentElement.parentElement.nodeName).toMatch(/footer/i);

      await user.click(about[1]);

      const path = screen.getByText(/\/about/);

      expect(path).toBeInTheDocument();
    });

    it('should render contact page', async () => {
      const user = userEvent.setup();

      const router = createMemoryRouter(routes);

      render(<RouterProvider router={router} />);

      const contact = screen.getAllByRole('link', { name: /contact/i });

      expect(contact[1].parentElement.parentElement.nodeName).toMatch(
        /footer/i,
      );

      await user.click(contact[1]);

      const path = screen.getByText(/\/contact/);

      expect(path).toBeInTheDocument();
    });
  });
});
