import App from '../App';
import ErrorPage from '../components/error/ErrorPage';
import Home from '../components/home/Home';
import Post from '../components/post/Post';
import About from '../components/about/About';
import Contact from '../components/contact/Contact';

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
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
    ],
  },
];

export default routes;
