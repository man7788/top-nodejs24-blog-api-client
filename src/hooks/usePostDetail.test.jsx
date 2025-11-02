import { renderHook, waitFor } from '@testing-library/react';
import usePostDetail from './usePostDetail';

const fetchSpy = vi.spyOn(global, 'fetch');

afterEach(() => {
  vi.clearAllMocks();
});

describe('usePostDetail hook', () => {
  it('should reponse with loading ', async () => {
    const { result } = renderHook(() => usePostDetail());

    expect(result.current).toEqual({ post: null, error: null, loading: true });
  });

  it('should reponse with error', async () => {
    fetchSpy.mockResolvedValue({
      status: 500,
    });

    const { result, rerender } = renderHook(() => usePostDetail());

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    rerender();

    expect(result.current).toEqual({
      post: null,
      error: Error('Server Error'),
      loading: false,
    });
  });

  it('should reponse with post', async () => {
    const post = {
      id: 1,
      title: 'Post title 1',
      content: 'Post content 1',
      createdAt: '2025-01-01T00:00:00Z',
      comments: [],
    };

    fetchSpy.mockResolvedValue({
      json: () => Promise.resolve({ data: { post } }),
      status: 200,
    });

    const { result, rerender } = renderHook(() => usePostDetail());

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    rerender();

    expect(result.current).toEqual({
      post,
      error: null,
      loading: false,
    });
  });
});
