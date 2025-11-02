import { renderHook, act, waitFor } from '@testing-library/react';
import useComments from './useComments';

const fetchSpy = vi.spyOn(global, 'fetch');

afterEach(() => {
  vi.clearAllMocks();
});

describe('usePostDetail hook', () => {
  it('should reponse with loading ', async () => {
    const { result } = renderHook(() => useComments());

    expect(result.current).toMatchObject({
      comments: null,
      error: null,
      loading: true,
    });
  });

  it('should reponse with error', async () => {
    fetchSpy.mockResolvedValue({
      status: 500,
    });

    const { result, rerender } = renderHook(() => useComments());

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    rerender();

    expect(result.current).toMatchObject({
      comments: null,
      error: Error('Server Error'),
      loading: false,
    });
  });

  it('should reponse with comments', async () => {
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

    fetchSpy.mockResolvedValue({
      json: () => Promise.resolve({ data: { comments } }),
      status: 200,
    });

    const { result, rerender } = renderHook(() => useComments());

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    rerender();

    expect(result.current).toMatchObject({
      comments,
      error: null,
      loading: false,
    });
  });

  it('should reponse with updated comments', async () => {
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

    fetchSpy
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ data: { comments: commentsLengthOne } }),
        status: 200,
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ data: { comments: commentsLengthTwo } }),
        status: 200,
      });

    const { result, rerender } = renderHook(() => useComments());

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    rerender();

    expect(result.current).toMatchObject({
      comments: commentsLengthOne,
      error: null,
      loading: false,
      update: false,
    });

    act(() => {
      result.current.setUpdate(!result.current.update);
    });

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(2);
    });

    rerender();

    expect(result.current).toMatchObject({
      comments: commentsLengthTwo,
      error: null,
      loading: false,
      update: true,
    });
  });
});
