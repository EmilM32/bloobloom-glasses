import { createRouter, createWebHistory } from 'vue-router';
import GlassView from '../views/GlassView.vue';
import { DEFAULT_CATEGORY } from '@/constans';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      redirect: {
        name: 'GlassView',
        params: {
          category: DEFAULT_CATEGORY
        }
      },
    },
    {
      path: '/:category',
      name: 'GlassView',
      component: GlassView
    }
  ]
});

export default router;
