<script>
import PlantListsTable from '../components/PlantListsTable.vue';

export default {
  components: { PlantListsTable },
  data() {
    return {
      allPlantlists: []
    };
  },
  async created() {
    this.allPlantlists = await (await fetch('http://localhost:8080/plantlists')).json();
  }
}
</script>

<template>
  <main>
    <PlantListsTable :items="allPlantlists" />
  </main>
</template>
