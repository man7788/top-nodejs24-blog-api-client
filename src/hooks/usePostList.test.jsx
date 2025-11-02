import { renderHook, waitFor } from '@testing-library/react';
import usePostList from './usePostList';

const fetchSpy = vi.spyOn(global, 'fetch');

afterEach(() => {
  vi.clearAllMocks();
});

describe('usePostList hook', () => {
  it('should reponse with loading', async () => {
    const { result } = renderHook(() => usePostList());

    expect(result.current).toEqual({ posts: null, error: null, loading: true });
  });

  it('should reponse with error', async () => {
    fetchSpy.mockResolvedValue({
      status: 500,
    });

    const { result, rerender } = renderHook(() => usePostList());

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    rerender();

    expect(result.current).toEqual({
      posts: null,
      error: Error('Server Error'),
      loading: false,
    });
  });

  it('should reponse with posts', async () => {
    const posts = [
      {
        id: 1,
        title: 'Post title 1',
        content: 'Post content 1',
        createdAt: '2025-01-01T00:00:00Z',
        comments: [],
      },
    ];

    fetchSpy.mockResolvedValue({
      json: () => Promise.resolve({ data: { posts } }),
      status: 200,
    });

    const { result, rerender } = renderHook(() => usePostList());

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    rerender();

    expect(result.current).toEqual({
      posts,
      error: null,
      loading: false,
    });
  });
});
