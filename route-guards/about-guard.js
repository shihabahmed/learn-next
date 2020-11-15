const AboutGuard = () => {
  return {
    canActivate: JSON.parse(localStorage.getItem('about') || 'false'),
  };
};

export default AboutGuard;
