<template>
  <div class="flex justify-center">
    <form v-on:submit.prevent="createDishes" class="w-1/2 p-6">
      <h2 class="text-2xl mb-4 text-center" style="color: dimgery">Добавление услуги</h2>
      <div class="flex flex-col">
        <InputText type="text" placeholder="Введите название" v-model="this.dishName" />
      </div>
      <div class="flex flex-col">
        <InputText
          type="text"
          placeholder="Введите рецепт приготовления"
          v-model="this.dishCooking"
        />
      </div>
      <div class="flex flex-col mb-4 mt-4">
        <InputText
          type="number"
          placeholder="Введите время приготовления"
          v-model="this.dishTime"
        />
      </div>
      <div class="mb-4 mt-4">
        <label
          for="file"
          id="file-label"
          class="block text-md font-medium text-gray-500 border border-gray-300 rounded-md p-2"
        >
          <span class="pi pi-upload mx-3"></span>Выбрать изображение</label
        >
        <input
          type="file"
          hidden
          id="file"
          name="file"
          v-on:change="changeCaption"
          required
          accept="image/*"
        />
      </div>

      <div class="flex flex-col mt-6">
        <PrimeButton type="submit" label="Создать" />
      </div>
    </form>
  </div>
  <Toast position="bottom-right" />
</template>
<script>
import InputText from 'primevue/inputtext'
import PrimeButton from 'primevue/button'
import { useDataStore } from '@/stores/dataStore'
import Toast from 'primevue/toast'

export default {
  name: 'CreateDishes',
  components: { InputText, PrimeButton, Toast },
  data() {
    return {
      dataStore: useDataStore(),
      dishName: '',
      dishCooking: '',
      dishTime: null,
      dishImage: null
    }
  },
  computed: {
    errorMessage() {
      return this.dataStore.errorMessage
    },
    errorCode() {
      return this.dataStore.errorCode
    }
  },
  methods: {
    changeCaption(event) {
      const file = event.target.files[0]
      if (file) {
        document.getElementById('file-label').innerHTML =
          '<span class="pi pi-file mx-3"></span>' + file.name
        this.dishImage = file
      } else {
        document.getElementById('file-label').innerHTML =
          '<span class="pi pi-upload mx-3"></span>Выбрать изображение'
        this.dishImage = null
      }
    },
    async createDishes() {
      const formData = new FormData()
      formData.append('name', this.dishName)
      formData.append('picture_url', this.dishImage)
      formData.append('cooking', this.dishCooking)
      formData.append('time', this.dishTime)
      await this.dataStore.create_dishes(formData)
      if (this.errorCode > 0)
        this.$toast.add({
          severity: 'error',
          summary: 'Ошибка добавления данных',
          detail: this.errorMessage,
          life: 4000
        })
      else
        this.$toast.add({
          severity: 'success',
          summary: 'Данные успешно добавлены',
          detail: this.errorMessage,
          life: 4000
        })
    }
  }
}
</script>
<style scoped></style>
