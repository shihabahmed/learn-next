// import '../styles/globals.css';
import Layout from '../components/Layout';

import Router from 'next/router';
import { Guards } from '../route-guards/guard.config';

// const checkRoute = (url) => {
//   setTimeout(() => {
//     const { canActivate } = Guards.check(url, JSON.stringify(Router));
//     if (!canActivate) {
//       Router.router.abortComponentLoad();
//       Router.push('/');
//     }
//   });
// };

// Router.ready(() => {
//   console.log(window.location.pathname);
//   checkRoute(window.location.pathname);
//   Router.router.events.on('routeChangeStart', checkRoute);
// });

function MyApp({ Component, pageProps }) {
  const { canActivate, redirect } = Guards.check(Component.name);
  if (!canActivate) {
    // Router.router.abortComponentLoad();
    if (redirect) {
      Router.push(redirect);
    } else {
      Router.back();
    }
  }

  return (
    <>
      <Layout>
        {canActivate && <Component {...pageProps} />}
      </Layout>
    </>
  );
}

export default MyApp;
