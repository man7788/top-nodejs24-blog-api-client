import styles from './CommentForm.module.css';
import { useState } from 'react';
import createComment from '../../../api/postComment';

const CommentForm = ({ postId, update, setUpdate }) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);

  const [form, setForm] = useState({ name: '', email: '', content: '' });

  const handleNameChange = (e) => {
    setForm({
      ...form,
      name: e.target.value,
    });
  };

  const handleEmailChange = (e) => {
    setForm({
      ...form,
      email: e.target.value,
    });
  };

  const handleContentChange = (e) => {
    setForm({
      ...form,
      content: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await createComment(
      postId,
      form.name,
      form.email,
      form.content,
    );

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
        return setLoading(false);
      } else {
        setError(true);
        return setLoading(false);
      }
    }

    setForm({ name: '', email: '', content: '' });
    setLoading(false);
    setUpdate(!update);
  };

  if (loading)
    return (
      <div>
        <h4 className={styles.title}>Leave a comment</h4>
        <h5>Loading...</h5>
      </div>
    );

  if (error) {
    return (
      <div>
        <h4 className={styles.title}>Leave a comment</h4>
        <h5>A network error was encountered</h5>
      </div>
    );
  }

  return (
    <section className={styles.CommentForm}>
      <h4 className={styles.title}>Leave a comment</h4>
      <form method="post" onSubmit={submitForm} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleNameChange}
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
            value={form.email}
            onChange={handleEmailChange}
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
            value={form.content}
            onChange={handleContentChange}
            className={styles.textarea}
          ></textarea>
          <div className={styles.errMessage}>
            {formError?.content && formError?.content}
          </div>
        </div>
        <input type="submit" value="Submit" className={styles.submit} />
      </form>
    </section>
  );
};

export default CommentForm;
