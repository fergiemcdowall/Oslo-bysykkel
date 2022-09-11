<!-- TODO -->
<!-- show closest bysykkel at the top -->

<script setup>
import Loader from "./components/Loader.vue";
import Error from "./components/Error.vue";
</script>

<script>
export default {
  data() {
    return {
      bysykkelData: [],
      syncError: null,
    };
  },
  mounted() {
    const fetchJSON = (url) => fetch(url).then((item) => item.json());

    const syncData = () =>
      Promise.all(
        [
          "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json",
          "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json",
        ].map(fetchJSON)
      );

    const joinData = ([info, status]) =>
      info.data.stations.map((item) => ({
        ...status.data.stations.filter(
          (itemStatus) => itemStatus.station_id == item.station_id
        )[0],
        ...item,
      }));

    syncData()
      .then(joinData)
      .then((bysykkelData) => (this.bysykkelData = bysykkelData))
      .catch((e) => (this.syncError = e));
  },
};
</script>

<template class="container-lg px-3 my-5 markdown-body">
  <h1>Oslo bysykkel</h1>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Bikes available</th>
        <th>Docks available</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!bysykkelData.length && !syncError">
        <Loader />
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
table {
  display: table;
}
</style>
