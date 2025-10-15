import App from '../App';
import ErrorPage from '../components/error/ErrorPage';
import Home from '../components/home/Home';

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
    ],
  },
];

export default routes;
