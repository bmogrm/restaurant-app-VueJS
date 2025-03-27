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
    :laading="true"
    :first="offset"
    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    currentPageReportTemplate="{first} to {last} of {totalRecords}"
  >
    <Column field="id" header="№" />
    <Column field="name" header="Наименование" />
    <Column field="cooking" header="Рецепт" />
    <Column field="time" header="Время приготовления" />
  </DataTable>
</template>
<script>
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { useDataStore } from '@/stores/dataStore'

export default {
  name: 'DishesList',
  components: { DataTable, Column },
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
