const AboutGuard = () => {
  return JSON.parse(localStorage.getItem('about') || 'false');
}

export default AboutGuard;