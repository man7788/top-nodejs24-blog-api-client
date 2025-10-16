import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

const usePostDetail = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/posts/${id}`,
          {
            mode: 'cors',
          },
        );

        if (response.status === 404) {
          throw new Error('Post Not Found');
        }

        if (response.status >= 400) {
          throw new Error('Server Error');
        }

        const result = await response.json();
        const data = result.data.post;

        setPost(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, update]);

  return { post, error, loading, update, setUpdate };
};

export default usePostDetail;
