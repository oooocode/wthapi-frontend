export default [
  { name: '主页', path: '/', icon: 'smile', component: './Index' },
  {
    name: '查看接口',
    path: '/interface_info/:id',
    icon: 'smile',
    component: './InterfaceInfo',
    hideInMenu: true,
  },
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' },
    ],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        name: '接口管理',
        icon: 'table',
        path: '/admin/interfaceInfo',
        component: './Admin/InterfaceInfo',
      },
      {
        name: '接口分析',
        icon: 'analysis',
        path: '/admin/Analysis',
        component: './Admin/InterfaceAnalysis',
      },
    ],
  },
  { path: '*', layout: false, component: './404' },
];
