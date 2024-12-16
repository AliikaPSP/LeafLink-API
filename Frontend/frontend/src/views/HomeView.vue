<script>
import PlantsTable from '../components/PlantsTable.vue'
import UsersTable from '../components/UsersTable.vue'
import PlantListsTable from '@/components/PlantListsTable.vue';

export default {
  components: { PlantsTable, UsersTable, PlantListsTable },
  data() {
    return {
      allPlants: [],
      allUsers: [],
      allPlantlists: [],
    };
  },
  async created() {
    this.allPlants = await (await fetch('http://localhost:8080/plants')).json();
    this.allUsers = await (await fetch('http://localhost:8080/users')).json();
    this.allPlantlists = await (await fetch('http://localhost:8080/plantlists')).json();
  }
}
</script>

<template>
  <main>
    <PlantsTable :items="allPlants" />
    <UsersTable :items="allUsers" />
    <PlantListsTable :items="allPlantlists" />
  </main>
</template>
