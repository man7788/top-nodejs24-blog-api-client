import { useState, useEffect } from 'react';

const usePostList = () => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
          mode: 'cors',
        });

        if (response.status >= 400) {
          throw new Error('Server Error');
        }

        const result = await response.json();
        const data = result.data.posts;

        setPosts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { posts, error, loading };
};

export default usePostList;
