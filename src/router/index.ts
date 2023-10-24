import { createRouter, createWebHistory } from 'vue-router'
import AppVue from '@/App.vue'
import LayoutVue from '@/components/Layout.vue'
import ShowTasksVue from '@/components/ShowTasks.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LayoutVue,
      redirect:"tasks/all",
      children:[
        {
          path:'tasks/:typeTask',
          component: ShowTasksVue
        },
        {
          path:'projects/:id',
          component: ShowTasksVue
        },
      ]
    },
  ]
})

export default router
