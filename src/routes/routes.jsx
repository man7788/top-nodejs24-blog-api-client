import App from '../App';
import ErrorPage from '../components/error/ErrorPage';
import Home from '../components/home/Home';
import Post from '../components/post/Post';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/posts/:id',
        element: <Post />,
      },
    ],
  },
];

export default routes;
