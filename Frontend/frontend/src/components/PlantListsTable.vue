<template>
  <table class="custom-table">
    <thead>
      <tr>
        <th>UserID</th>
        <th>Plants</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.PlantListID">
        <td>{{ item.UserID }}</td>
        <td>{{ item.PlantID }}</td>
        <td class="actions">
          <button class="btn btn-info" @click="goToUpdate(item.PlantListID)">
            Update
          </button>
          <button class="btn btn-danger" @click="deletePlant(item.PlantListID)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "PlantListsTable",
  props: {
    items: Array, // Array of plant list objects
  },
  methods: {
    // Navigate to the update page for the selected plant list
    goToUpdate(id) {
      this.$router.push({ name: "plantListUpdate", params: { id } });
    },

    // Delete the selected plant list
    async deletePlant(plantListId) {
      try {
        const response = await fetch(`http://localhost:8080/plantlists/${plantListId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`Failed to delete plant list with ID: ${plantListId}`);
        }
        alert("Plant list deleted successfully!");

        // Find the index of the deleted plant list and remove it from the local items array
        const index = this.items.findIndex((item) => item.PlantListID === plantListId);
        if (index !== -1) {
          this.items.splice(index, 1);
        }
      } catch (err) {
        console.error("Failed to delete plant list:", err);
        alert("An error occurred while deleting the plant list.");
      }
    },

    // Get the plant name by PlantID
    getPlantNameByID(plantID) {
      const plant = this.$parent.allPlants.find((p) => p.PlantID === plantID);
      return plant ? plant.PlantName : "Unknown";
    },
  },
};
</script>

<style scoped>
/* Table styling */
.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0px 0;
  font-size: 1rem;
  text-align: left;
  background-color: #e6e4d7; /* Body background color */
}

.custom-table thead {
  background-color: #7D9883; /* Header background color */
  color: white;
  font-weight: bold;
}

.custom-table th, .custom-table td {
  border: 1px solid #ddd;
  padding: 12px 15px;
}

/* Change body text color */
.custom-table tbody tr td {
  color: #618068;
}

.custom-table tbody tr:nth-child(even) {
  background-color: #f4f4f4; /* Stripe effect */
}

.custom-table tbody tr:hover {
  background-color: #e0e0e0; /* Hover effect */
}

/* Button styling */
.actions {
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
}

button {
  padding: 10px 20px;
  margin: 5px;
  background-color: #7D9883; /* Match button color with header */
  color: white;
  border: none;
  border-radius: 20px;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

button.btn-info {
  background-color: #7D9883; /* Custom background */
  color: white;
}

button.btn-info:hover {
  background-color: #A2B09B; /* Hover effect */
}

button.btn-danger {
  background-color: #BF5656; /* Danger button color */
  color: white;
}

button.btn-danger:hover {
  background-color: #C82333; /* Danger button hover */
}
</style>
