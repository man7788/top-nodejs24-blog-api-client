import styles from './CommentForm.module.css';

const CommentForm = () => {
  return (
    <div className={styles.CommentForm}>
      <h4>Leave a comment</h4>
      <form method="post">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <br></br>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <br></br>
        <textarea
          name="content"
          defaultValue="Your comment here"
          rows="5"
          cols="30"
        ></textarea>
        <br></br>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CommentForm;
