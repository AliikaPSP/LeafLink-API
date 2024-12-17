<script>
export default {
  name: "PlantsTable",
  props: {
    items: Array
  },
  methods: {
    goToDetails(id) {
      // Log the ID to verify it's being passed correctly
      console.log(id);
      this.$router.push({ name: 'plantDetails', params: { id } });
    },
    goToUpdate(id) {
      this.$router.push({ name: 'plantUpdate', params: { id } });
    }
  }
}
</script>

<template>
  <table class="table table-striped">
    <thead class="table-dark">
      <tr>
        <th>PlantID</th>
        <th>PlantName</th>
        <th>Actions</th>  
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.PlantID">
        <td>{{ item.PlantID }}</td>
        <td>{{ item.PlantName }}</td>
        <td>
          <button @click="goToDetails(item.PlantID)">Details</button>
          <button @click="goToUpdate(item.PlantID)">Update</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
