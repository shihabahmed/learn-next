const AboutGuard = () => {
  return {
    canActivate: JSON.parse(localStorage.getItem('about') || 'false'),
    redirect: '/'
  };
};

export default AboutGuard;
