import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import Dishes from '@/components/Dishes.vue'
import Categories from '@/components/Categories.vue'
import Ingredients from '@/components/Ingredients.vue'
import Recipes from '@/components/Recipes.vue'
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/categories',
    component: Categories
  },
  {
    path: '/dishes',
    component: Dishes
  },
  {
    path: '/ingredients',
    component: Ingredients
  },
  {
    path: '/recipes',
    component: Recipes
  }
]
const router = createRouter({
  history: createWebHistory(), // Используем режим истории HTML5
  routes // Список маршрутов
})

export default router
