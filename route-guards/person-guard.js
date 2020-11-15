const PersonGuard = () => {
  return {
    canActivate: JSON.parse(localStorage.getItem('person') || 'false')
  };
}

export default PersonGuard;