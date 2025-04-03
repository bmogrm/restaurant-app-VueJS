<template>
  <DataTable
    :value="dishes"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords="dishes_total"
    @page="onPageChange"
    responsive-layout="scroll"

    :first="offset"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"

    currentPageReportTemplate="{first} to {last} of {totalRecords}"
  >
    <Column field="id" header="№" />
    <Column field="name" header="Наименование" />
    <Column field="cooking" header="Рецепт" />
    <Column field="time" header="Время приготовления" />
    <Column header="Изображение">
                <template #body="{data}">
                        <div style="display: flex; align-items: center;">
                                <img :src="data.picture_url" :alt="data.name" v-if="data.picture_url" style="max-width: 100px; max-height: 100px; object-fit: contain;">
                                <span v-else>Нет изображения</span>
                        </div>
                </template>
            </Column>
    <template #footer>
      <div class="text-end">
        <Button
          type="button"
          label="Добавить блюдо"
          icon="pi pi-users"
          @click="this.$router.push('/createDishes')"
          style="width: 30px; height: 30px; font-size: 2rem"
        />
      </div>
    </template>
  </DataTable>
</template>
<script>
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import { useDataStore } from '@/stores/dataStore'

export default {
  name: 'DishesList',
  components: { DataTable, Column, Button },
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0
    }
  },
  computed: {
    dishes() {
      return this.dataStore.dishes
    },
    dishes_total() {
      return this.dataStore.dishes_total
    }
  },
  mounted() {
    console.log('sessions componnet MOUNTED!')
    this.dataStore.get_dishes()
    this.dataStore.get_dishes_total()
    console.log('dishes=', this.dishes)
    console.log('dishes_total=', this.dishes_total)
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first
      this.perpage = event.rows
      this.dataStore.get_dishes(this.offset / this.perpage, this.perpage)
    }
  }
}
</script>
