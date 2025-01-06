<script>
import PlantsTable from '../components/PlantsTable.vue';
import CreatePlantForm from "../components/CreatePlantForm.vue";

export default {
  components: { PlantsTable, CreatePlantForm },
  data() {
    return {
      allPlants: []
    };
  },
  async created() {
    await this.fetchPlants();
  },
  methods: {
    async fetchPlants() {
      this.allPlants = await (await fetch("http://localhost:8080/plants")).json();
    },
    async handlePlantCreated(newPlant) {
      // Update the plant list when a new plant is created
      this.allPlants.push(newPlant);
    }
  }
};
</script>

<template>
  <main>
    <CreatePlantForm @plantCreated="handlePlantCreated" />
    <PlantsTable :items="allPlants" />
  </main>
</template>