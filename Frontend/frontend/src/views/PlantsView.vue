<script>
import PlantsTable from '../components/PlantsTable.vue'

export default {
  components: { PlantsTable },
  data() {
    return {
      allPlants: []
    };
  },
  async created() {
    this.allPlants = await (await fetch('http://localhost:8080/plants')).json();
  },
  methods: {
    // Method to handle the plantDeleted event
    async handlePlantDeleted(plantId) {
      // Option 1: Filter out the deleted plant from the list locally
      this.allPlants = this.allPlants.filter(plant => plant.PlantID !== plantId);
      // Option 2: Alternatively, you could re-fetch the list from the server to ensure it's up to date
      // this.allPlants = await (await fetch('http://localhost:8080/plants')).json();
    }
  }
}
</script>

<template>
  <main>
    <PlantsTable :items="allPlants" @plantDeleted="handlePlantDeleted"/>
  </main>
</template>