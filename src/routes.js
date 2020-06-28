import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Store = React.lazy(() => import('./views/store'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/store', exact: true, name: 'Outlet', component: Store },
];

export default routes;
