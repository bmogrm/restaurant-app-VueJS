<template>
  <DataTable
    :value="categories"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords="categories_total"
    @page="onPageChange"
    responsive-layout="scroll"
    :laading="true"
    :first="offset"
    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    currentPageReportTemplate="{first} to {last} of {totalRecords}"
  >
    <Column field="id" header="№" />
    <Column field="name" header="Наименование" />
  </DataTable>
</template>
<script>
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { useDataStore } from '@/stores/dataStore'

export default {
  name: 'CategoriesList',
  components: { DataTable, Column },
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0
    }
  },
  computed: {
    categories() {
      return this.dataStore.categories
    },
    categories_total() {
      return this.dataStore.categories_total
    }
  },
  mounted() {
    console.log('sessions componnet MOUNTED!')
    this.dataStore.get_categories()
    this.dataStore.get_categories_total()
    console.log('categories=', this.categories)
    console.log('categories_total', this.categories_total)
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first
      this.perpage = event.rows
      this.dataStore.get_categories(this.offset / this.perpage, this.perpage)
    }
  }
}
</script>
