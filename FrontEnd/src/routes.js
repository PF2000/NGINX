import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import VHostView from './components/views/VHost.vue'
import ListVHostView from './components/views/VHostsList.vue'
import UpstreamsListCreateView from './components/views/UpstreamsListCreate.vue'
import TemplatesView from './components/views/Templates.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Overview of environment'}
      }, {
        path: 'VHost',
        component: VHostView,
        name: 'VHost',
        meta: {description: 'Here is possible to manage a Virtual Host'}
      }, {
        path: 'VHost/:id',
        component: VHostView,
        name: 'VHost ',
        meta: {description: 'Here is possible to manage a Virtual Host'}
      }, {
        path: 'listVHosts',
        component: ListVHostView,
        name: 'List VHost',
        meta: {description: 'Here is possible to list all Virtual Hosts'}
      }, {
        path: 'upstreams',
        component: UpstreamsListCreateView,
        name: 'List or Create Upstreams',
        meta: {description: 'Here is possible to list or create Upstreams'}
      }, {
        path: 'templates',
        component: TemplatesView,
        name: 'List Templates',
        meta: {description: 'Here is possible to list Templates'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
