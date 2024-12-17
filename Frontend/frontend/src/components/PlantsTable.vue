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
<<<<<<< HEAD
    goToUpdate(id) {
      this.$router.push({ name: 'plantUpdate', params: { id } });
=======

    async deletePlant(plantId) {
      try {
        // Send DELETE request to backend
        await fetch(`http://localhost:8080/plants/${plantId}`, { method: 'DELETE' });

        // Refresh the list or notify the user that the plant has been deleted
        this.$emit('plantDeleted', plantId); // Notify parent to refresh the plant list
        console.log('Plant deleted');
      } catch (err) {
        console.error('Failed to delete plant:', err);
      }
>>>>>>> Delete
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
<<<<<<< HEAD
          <button @click="goToUpdate(item.PlantID)">Update</button>
=======
          <button @click="deletePlant(item.PlantID)">Delete</button>
>>>>>>> Delete
        </td>
      </tr>
    </tbody>
  </table>
</template>
