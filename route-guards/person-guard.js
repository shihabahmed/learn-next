const PersonGuard = () => {
  return {
    canActivate: JSON.parse(localStorage.getItem('person') || 'false'),
    redirect: '/people'
  };
}

export default PersonGuard;