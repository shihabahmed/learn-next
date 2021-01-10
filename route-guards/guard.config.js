import AboutGuard from './about-guard';
import PersonGuard from './person-guard';

const Guards = {
  routes: [
    {
      path: '/about',
      component: 'About',
      guard: AboutGuard,
    },
    {
      path: '/people/[id]',
      component: 'Person',
      guard: PersonGuard,
    },
  ],
  // check: (url, component) => {
  //   console.log(url, JSON.parse(router));
  //   const { guard } = Guards.routes.find((c) => c.path === url) || {
  //     guard: () => ({ canActivate: true }),
  //   };

  //   return guard();
  // },
  check: (component) => {
    let guard = () => ({ canActivate: true, redirect: '/'});
    if (typeof window !== 'undefined') {
      const {_guard} = Guards.routes.find((c) => c.component === component);
      guard = _guard || guard;
    }

    return guard();
  },
};

export { Guards };
