<script>
import PlantsTable from "../components/PlantsTable.vue";
import CreatePlantForm from "../components/CreatePlantForm.vue";

export default {
  components: { PlantsTable, CreatePlantForm },
  data() {
    return {
      allPlants: []
    };
  },
  async created() {
    this.allPlants = await (await fetch("http://localhost:8080/plants")).json();
  },
  methods: {
    async fetchPlants() {
      this.allPlants = await (await fetch("http://localhost:8080/plants")).json();
    },
    async handlePlantCreated(newPlant) {
      this.allPlants.push(newPlant);
    },
    async handlePlantDeleted(plantId) {
      this.allPlants = this.allPlants.filter(plant => plant.PlantID !== plantId);
    }
  }
};
</script>

<template>
  <main class="container">
    <div class="form-section">
      <CreatePlantForm @plantCreated="handlePlantCreated" />
    </div>
    <div class="table-section">
      <PlantsTable :items="allPlants" @plantDeleted="handlePlantDeleted" />
    </div>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem; /* Adds space between the form and the table */
  padding: 2rem; /* Add padding around the container */
}

.form-section {
  flex: 1;
  max-width: 400px; /* Limit the width of the form */
  background-color: #f9f9f9; /* Light background for the form */
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.table-section {
  flex: 3; /* Take the remaining space for the table */
  overflow-x: auto; /* Allow scrolling if the table overflows horizontally */
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

input, select, textarea {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th, table td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: left;
}

table th {
  background-color: #f4f4f4;
}

table tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
