const auth = localStorage.getItem('authMe');
const def = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Outlet',
    to: '/store',
    icon: 'cilHome'
  },
];
const report = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Subscription',
    to: '/subscription',
    icon: 'cil-star'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Report Subscription',
    to: '/report/subscription',
    icon: 'cil-star'
  }
]

const nav = !auth ? def : [...def, report]

export default nav;

