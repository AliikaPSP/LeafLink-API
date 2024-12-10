<script>
import PlantsTable from '../components/PlantsTable.vue'
export default {
  components: { PlantsTable },
  data() { return {
    allPlants: []
  }},
  async Created() {
    this.allPlants = await (await fetch('http://localhost:8080/plants')).json()
  }
}
</script>

<template>
  <main>
    <PlantsTable :items="allPlants
    
    "/>
  </main>
</template>
