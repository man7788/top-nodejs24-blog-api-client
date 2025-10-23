import styles from './CommentForm.module.css';
import { useState } from 'react';
import createComment from '../../../api/postComment';

const CommentForm = ({ id, update, setUpdate }) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await createComment(id, name, email, content);

    if (error) {
      if (error.details) {
        const formError = {};

        error.details.map((error) => {
          if (error.field === 'email') {
            formError.email = error.message;
          } else if (error.field === 'name') {
            formError.name = error.message;
          } else if (error.field === 'content') {
            formError.content = error.message;
          }
        });

        setFormError(formError);
      } else {
        setError(true);
      }
    }

    setLoading(false);
    setUpdate(!update);
  };

  if (loading)
    return (
      <div>
        <h4 className={styles.title}>Leave a comment</h4>
        <h4>Loading...</h4>
      </div>
    );

  if (error) {
    return (
      <div>
        <h4 className={styles.title}>Leave a comment</h4>
        <h4>A network error was encountered</h4>
      </div>
    );
  }

  return (
    <div className={styles.CommentForm}>
      <h4 className={styles.title}>Leave a comment</h4>
      <form method="post" onSubmit={submitForm} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={styles.input}
          />
          <div className={styles.errMessage}>
            {formError?.name && formError?.name}
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={styles.input}
          />
          <div className={styles.errMessage}>
            {formError?.email && <div>{formError?.email}</div>}
          </div>
        </div>
        <div className={styles.textareaGroup}>
          <textarea
            name="content"
            placeholder="Your comment here"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className={styles.textarea}
          ></textarea>
          <div className={styles.errMessage}>
            {formError?.content && formError?.content}
          </div>
        </div>
        <input type="submit" value="Submit" className={styles.submit} />
      </form>
    </div>
  );
};

export default CommentForm;
