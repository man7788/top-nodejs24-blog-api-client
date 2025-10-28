import { useLocation } from 'react-router';

const About = () => {
  const { pathname } = useLocation();

  return <div>{pathname}</div>;
};

export default About;
