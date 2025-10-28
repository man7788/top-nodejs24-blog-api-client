import { useLocation } from 'react-router';

const Contact = () => {
  const { pathname } = useLocation();

  return <div>{pathname}</div>;
};

export default Contact;
