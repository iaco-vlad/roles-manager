import { createRouter, createWebHashHistory } from 'vue-router'
import PreviewRoles from "@/components/PreviewRoles.vue";
import NewRole from "@/components/NewRole.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: PreviewRoles
  },
  {
    path: '/create',
    name: 'create',
    component: NewRole,
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: NewRole,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
