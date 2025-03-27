import { defineStore } from 'pinia'
import axios from 'axios'
//import { useAuthStore } from './authStore'
const backendUrl = import.meta.env.VITE_BACKEND_URL

export const useDataStore = defineStore('data', {
  state: () => ({
    categories: [],
    categories_total: null,
    dishes: [],
    dishes_total: null,
    recipes: [],
    recipes_total: null,
    ingredients: [],
    ingredients_total: null,
    errorMessage: ''
  }),
  actions: {
    async get_categories(page = 0, perpage = 5) {
      this.errorMessage = ''
      try {
        console.log(perpage)
        const response = await axios.get(backendUrl + '/category', {
          params: {
            // Добавляем параметры для пагинации
            page: page,
            perpage: perpage
          }
        })
        this.categories = response.data // Предполагаем, что API возвращает массив данных в свойстве 'data'
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message
          console.log(error)
        } else if (error.request) {
          this.errorMessage = error.message
          console.log(error)
        } else {
          console.log(error)
        }
      }
    },

    async get_categories_total() {
      this.errorMessage = ''
      try {
        const response = await axios.get(backendUrl + '/categories_total')
        this.categories_total = response.data
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message
          console.log(error)
        } else if (error.request) {
          this.errorMessage = error.message
          console.log(error)
        } else {
          console.log(error)
        }
      }
    },

    async get_dishes(page = 0, perpage = 5) {
      this.errorMessage = ''
      try {
        console.log(perpage)
        const response = await axios.get(backendUrl + '/dish', {
          params: {
            // Добавляем параметры для пагинации
            page: page,
            perpage: perpage
          }
        })
        this.dishes = response.data // Предполагаем, что API возвращает массив данных в свойстве 'data'
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message
          console.log(error)
        } else if (error.request) {
          this.errorMessage = error.message
          console.log(error)
        } else {
          console.log(error)
        }
      }
    },

    async get_dishes_total() {
      this.errorMessage = ''
      try {
        const response = await axios.get(backendUrl + '/dishes_total')
        this.dishes_total = response.data
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message
          console.log(error)
        } else if (error.request) {
          this.errorMessage = error.message
          console.log(error)
        } else {
          console.log(error)
        }
      }
    }
  }
})
