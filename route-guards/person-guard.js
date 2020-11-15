const PersonGuard = () => {
  return JSON.parse(localStorage.getItem('person') || 'false');
}

export default PersonGuard;