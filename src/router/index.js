import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
      meta: { guest: true }
    },
    {
      path: '/superadmin/login',
      name: 'SuperAdminLogin',
      component: () => import('../views/SuperAdminLoginView.vue'),
      meta: { guest: true }
    },
    {
      path: '/superadmin',
      component: () => import('../layouts/SuperAdminLayout.vue'),
      meta: { requiresAuth: true, roles: ['superadmin'] },
      children: [
        {
          path: '',
          name: 'SuperAdminDashboard',
          component: () => import('../views/SuperAdminDashboardView.vue')
        },
        {
          path: 'tenants',
          name: 'SuperAdminTenants',
          component: () => import('../views/SuperAdminTenantsView.vue')
        },
        {
          path: 'tenants/create',
          name: 'SuperAdminTenantCreate',
          component: () => import('../views/SuperAdminTenantCreateView.vue')
        }
      ]
    },
    {
      path: '/',
      component: () => import('../layouts/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('../views/DashboardView.vue')
        },
        {
          path: 'profile',
          name: 'Profile',
          component: () => import('../views/ProfileView.vue')
        },
        {
          path: 'users',
          name: 'Users',
          component: () => import('../views/UsersView.vue'),
          meta: { roles: ['owner', 'admin'] }
        },
        {
          path: 'admins',
          name: 'Admins',
          component: () => import('../views/AdminsView.vue'),
          meta: { roles: ['owner'] }
        },
        {
          path: 'applications',
          name: 'Applications',
          component: () => import('../views/ApplicationsView.vue'),
          meta: { roles: ['owner', 'admin'] }
        },
        {
          path: 'assignments',
          name: 'Assignments',
          component: () => import('../views/AssignmentsView.vue'),
          meta: { roles: ['owner', 'admin'] }
        },
        {
          path: 'connectors',
          component: () => import('../layouts/AIWorkspaceLayout.vue'),
          meta: { requiresAuth: true },
          children: [
            {
              path: '',
              name: 'Connectors',
              component: () => import('../views/ai_workspace/ConnectorsView.vue')
            }
          ]
        },
        {
          path: 'llm/providers',
          component: () => import('../layouts/AIWorkspaceLayout.vue'),
          meta: { requiresAuth: true },
          children: [
            {
              path: '',
              name: 'LLMProviders',
              component: () => import('../views/ai_workspace/LLMProvidersView.vue')
            }
          ]
        },
        {
          path: 'create-app',
          component: () => import('../layouts/AIWorkspaceLayout.vue'),
          meta: { requiresAuth: true },
          children: [
            {
              path: 'createapp',
              name: 'CreateApp',
              component: () => import('../views/ai_workspace/CreateAppView.vue')
            },
            
            {
              path: 'guide',
              name: 'CreateAppGuide',
              component: () => import('../views/ai_workspace/CreateAppGuideView.vue')
            }
          ]
        },
        {
          path: 'my-apps',
          component: () => import('../layouts/AIWorkspaceLayout.vue'),
          meta: { requiresAuth: true },
          children: [
            {
              path: '',
              name: 'MyApps',
              component: () => import('../views/ai_workspace/MyAppsView.vue')
            }
          ]
        },
        {
          path: 'history',
          component: () => import('../layouts/AIWorkspaceLayout.vue'),
          meta: { requiresAuth: true },
          children: [
            {
              path: '',
              name: 'History',
              component: () => import('../views/ai_workspace/HistoryView.vue')
            }
          ]
        }
      ]
    }
  ]
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next(to.path.startsWith('/superadmin') ? '/superadmin/login' : '/login')
  } else if (to.meta.guest && authStore.isAuthenticated) {
    if (to.path.startsWith('/superadmin') && authStore.isSuperAdmin) {
      next('/superadmin')
    } else {
      next('/')
    }
  } else if (to.meta.roles && !to.meta.roles.includes(authStore.user?.role)) {
    next('/')
  } else {
    next()
  }
})

export default router
