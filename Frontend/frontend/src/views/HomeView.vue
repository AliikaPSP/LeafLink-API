<script>
import PlantsTable from '../components/PlantsTable.vue'
// import UsersTable from '../components/UsersTable.vue'

export default {
  components: { PlantsTable, UsersTable},
  data() { return {
    allPlants: [],
    // allUsers: []
  }},
  async Created() {
    this.allPlants = await (await fetch('http://localhost:8080/plants')).json()
    // this.allUsers = await (await fetch('http://localhost:8080/users')).json()
  }
}
</script>

<template>
  <main>
    <PlantsTable :items="allPlants
    
    "/>
    <!-- <UsersTable :items="allUsers"/> -->
  </main>
</template>
