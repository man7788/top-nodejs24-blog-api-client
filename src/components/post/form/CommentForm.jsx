import styles from './CommentForm.module.css';
import { useState } from 'react';

const CommentForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

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
    </div>
  );
};

export default CommentForm;
