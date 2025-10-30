import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

const useComments = () => {
  const { id } = useParams();

  const [comments, setComments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/posts/${id}/comments`,
          {
            mode: 'cors',
          },
        );

        if (response.status >= 400) {
          throw new Error('Server Error');
        }

        const result = await response.json();
        const data = result.data.comments;

        setComments(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [update]);

  return { comments: [], error, loading, update, setUpdate };
};

export default useComments;
