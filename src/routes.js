import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Store = React.lazy(() => import('./views/store'));
const Topup = React.lazy(() => import('./views/topup'));
const TopupAdd = React.lazy(() => import('./views/topup/add'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/store', exact: true, name: 'Outlet', component: Store },
  { path: '/topup', exact: true, name: 'Topup', component: Topup },
  { path: '/topup/add', name: 'Topup Add', component: TopupAdd },
];

export default routes;
