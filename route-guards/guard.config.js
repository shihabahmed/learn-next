import AboutGuard from './about-guard';
import PersonGuard from './person-guard';

const Guards = {
  routes: [
    {
      path: '/about',
      guard: AboutGuard,
    },
    {
      path: '/people/[id]',
      guard: PersonGuard,
    },
  ],
  check: (url, router) => {
    console.log(url, JSON.parse(router));
    const { guard } = Guards.routes.find((c) => c.path === url) || {
      guard: () => ({ canActivate: true }),
    };

    return guard();
  },
};

export { Guards };
