import AboutGuard from './about-guard';
import PersonGuard from './person-guard';

const GuardConfig = [
  {
    path: '/about',
    guard: AboutGuard
  },
  {
    path: '/people/[id]',
    guard: PersonGuard
  }
];

export { GuardConfig };