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
  <div class="container">
    <div class="grid-container">
      <div class="form-card">
        <CreatePlantForm @plantCreated="handlePlantCreated" />
      </div>
      <div class="table-section">
        <PlantsTable :items="allPlants" @plantDeleted="handlePlantDeleted" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Main container for spacing */
.container {
  padding: 2rem; /* Add padding around the container */
}

/* Grid layout for form and table */
.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr); /* Define a 12-column grid */
  gap: 2rem; /* Add space between grid items */
}

/* Form section styling */
.form-card {
  grid-column: span 4; /* Form takes 6 columns */
  background-color: #7d9883; /* Light background for the form */
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Table section styling */
.table-section {
  grid-column: span 8; /* Table takes 6 columns */
  overflow-x: auto; /* Allow horizontal scrolling if needed */
}

/* Table styling */
table {
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: left;
}

table th {
  background-color: #f4f4f4;
  color: #333;
}

table tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* Input styling for form */
input,
select,
textarea {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Responsive design adjustments */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr; /* Switch to single column on smaller screens */
  }

  .form-card,
  .table-section {
    grid-column: span 12; /* Take full width on smaller screens */
  }
}
</style>
