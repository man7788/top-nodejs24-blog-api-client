import styles from './CommentForm.module.css';
import { useState } from 'react';
import createComment from '../../../api/postComment';

const CommentForm = ({ id, update, setUpdate }) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);

  const [name, setName] = useState('front end');
  const [email, setEmail] = useState('front@end.com');
  const [content, setContent] = useState('front end comment');

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await createComment(id, name, email, content);

    if (error) {
      if (error.details) {
        setFormError(error.details);
      } else {
        setError(true);
      }
    }

    setLoading(false);
    setUpdate(!update);
  };

  if (loading) return <p>Loading...</p>;

  if (error) {
    return <p>A network error was encountered</p>;
  }

  return (
    <div className={styles.CommentForm}>
      <h4>Leave a comment</h4>
      <form method="post" onSubmit={submitForm}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <br></br>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br></br>
        <textarea
          name="content"
          rows="5"
          cols="30"
          placeholder="Your comment here"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        ></textarea>
        <br></br>
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {formError &&
          formError.map((item) => <li key={item.field}>{item.message}</li>)}
      </ul>
    </div>
  );
};

export default CommentForm;
