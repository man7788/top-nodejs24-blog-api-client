import styles from './Post.module.css';
import { useParams } from 'react-router';
import Comment from './comment/Comment';
import CommentForm from './form/CommentForm';

const Post = () => {
  const { id } = useParams();

  const post = {
    id: 1,
    title: 'Title for the first post',
    content: 'Content for the first post.',
    createdAt: '2025-10-15T19:20:06.240Z',
    updatedAt: '2025-10-15T19:20:06.240Z',
    comments: [
      {
        id: 1,
        name: 'John Doe',
        content: 'First commennt for the first post.',
        createdAt: '2025-10-15T19:20:06.295Z',
      },
      {
        id: 2,
        name: 'John Doe',
        email: 'john@doe.com',
        content: 'Second commennt for the first post.',
        createdAt: '2025-10-15T19:20:06.295Z',
      },
    ],
  };

  return (
    <div className={styles.Post}>
      <h1>{post.title}</h1>
      {post.content}
      <h3>Comments:</h3>
      {post.comments.map((comment) => (
        <Comment
          key={comment.id}
          name={comment.name}
          content={comment.content}
          created={comment.createdAt}
        />
      ))}
      <CommentForm />
    </div>
  );
};

export default Post;
