const postComment = async (id, name, email, content) => {
  const payload = { name, email, content };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/${id}/comments`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'cors',
      },
    );

    if (response.status >= 400) {
      const result = await response.json();

      return { error: result.error };
    }

    const result = await response.json();
    const data = result.data;

    return data;
  } catch (error) {
    console.error(error);
  }
};

export default postComment;
