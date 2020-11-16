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
    const { guard } = Guards.routes.find((c) => c.component === component) || {
      guard: () => ({ canActivate: true }),
    };

    const result = guard();
    // if (!result.redirect) {
    //   result['redirect'] = '.';
    // }

    return result;
  },
};

export { Guards };
