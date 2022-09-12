<!-- TODO -->
<!-- sort functionality -->
<!-- distance functionality -->

<script setup>
import Error from './components/Error.vue'
import Loader from './components/Loader.vue'
import { getBysykkelData } from './lib/BysykkelData.js'
</script>

<script>
export default {
  data() {
    return {
      bysykkelData: [],
      syncError: null
    }
  },
  mounted() {
    getBysykkelData()
      .then(bysykkelData => (this.bysykkelData = bysykkelData))
      .catch(e => (this.syncError = e))
  }
}
</script>

<template class="container-lg px-3 my-5 markdown-body">
  <h1>Oslo bysykkel</h1>
  <table class="bikes">
    <thead>
      <tr>
        <th>Name</th>
        <th>Bikes available</th>
        <th>Docks available</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!bysykkelData.length && !syncError">
        <td colspan="3" class="loader">
          <Loader />
        </td>
      </tr>
      <tr v-if="syncError">
        <td colspan="3">
          <Error
            :err="syncError"
            msg="Oops! it looks like we are having trouble talking to our server."
          />
        </td>
      </tr>
      <tr v-for="(row, i) in bysykkelData" :key="i">
        <td>
          <a
            :href="
              'https://www.google.com/maps/search/?api=1&query=' +
              row.lat +
              '%2C' +
              row.lon
            "
            target="_blank"
            >{{ row.name }}</a
          >
        </td>
        <td>{{ row.num_docks_available }}</td>
        <td>{{ row.num_bikes_available }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table.bikes {
  display: table;
}
td.loader {
  text-align: center;
}
</style>
