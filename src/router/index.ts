import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import KnowledgeBase from '../views/KnowledgeBase.vue'
import QAPage from '../views/QAPage.vue'
import SettingsPage from '../views/SettingsPage.vue'
import SearchPage from '../views/SearchPage.vue'
import IssueAnalysis from '../views/IssueAnalysis.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/knowledge',
      name: 'knowledge',
      component: KnowledgeBase
    },
    {
      path: '/qa',
      name: 'qa',
      component: QAPage
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsPage
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage
    },
    {
      path: '/issue',
      name: 'issue',
      component: IssueAnalysis
    }
  ],
})

export default router
