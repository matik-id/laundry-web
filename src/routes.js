import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Store = React.lazy(() => import('./views/store'));
const Topup = React.lazy(() => import('./views/topup'));
const TopupAdd = React.lazy(() => import('./views/topup/add'));
const Subscribe = React.lazy(() => import('./views/subscribe'));
const Subscription = React.lazy(() => import('./views/subscription'));
const SubscriptionAdd = React.lazy(() => import('./views/subscription/add'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/store', exact: true, name: 'Outlet', component: Store },
  { path: '/topup', exact: true, name: 'Topup', component: Topup },
  { path: '/topup/add', name: 'Topup Add', component: TopupAdd },
  { path: '/subscribe', exact: true, name: 'Subscribe', component: Subscribe },
  { path: '/subscription', exact: true, name: 'Subscription', component: Subscription },
  { path: '/subscription/add', exact: true, name: 'Subscription Add', component: SubscriptionAdd },
];

export default routes;
