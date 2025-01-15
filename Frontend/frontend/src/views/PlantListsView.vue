<template>
  <main>
    <!-- Form to add plants to the list -->
    <div>
      <input v-model="userID" placeholder="Enter UserID" />

      <!-- Display a loading message if plants are not loaded yet -->
      <select v-model="selectedPlantIDs" multiple v-if="allPlants.length > 0">
        <option v-for="plant in allPlants" :key="plant.PlantID" :value="plant.PlantID">
          {{ plant.PlantName }}
        </option>
      </select>
      <div v-else>Loading plants...</div>

      <button @click="addPlantsToList">Add Plants</button>
    </div>

    <!-- Display selected plants as names after addition -->
    <div v-if="selectedPlantNames.length > 0">
      <h3>Selected Plants:</h3>
      <ul>
        <li v-for="plant in selectedPlantNames" :key="plant">{{ plant }}</li>
      </ul>
    </div>

    <!-- Display Plant Lists -->
    <PlantListsTable :items="allPlantlists" />
  </main>
</template>

<script>
import PlantListsTable from '../components/PlantListsTable.vue';

export default {
  components: { PlantListsTable },
  data() {
    return {
      allPlantlists: [], // Store all plant lists
      userID: '', // UserID for the plant list
      selectedPlantIDs: [], // Array to store selected plant IDs
      allPlants: [], // Store all plants to populate the dropdown
      selectedPlantNames: [] // Store names of selected plants
    };
  },
  async created() {
    try {
      // Fetch plant lists and plants
      const plantlistsResponse = await fetch('http://localhost:8080/plantlists');
      const plantsResponse = await fetch('http://localhost:8080/plants');

      // Check if both requests are successful
      if (!plantlistsResponse.ok || !plantsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      this.allPlantlists = await plantlistsResponse.json();
      this.allPlants = await plantsResponse.json();

      console.log('Plants:', this.allPlants); // Debugging line to check plant data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  methods: {
    async addPlantsToList() {
      if (this.userID && this.selectedPlantIDs.length > 0) {
        try {
          // Check if the user already has a plant list
          const existingPlantList = this.allPlantlists.find(
            (list) => list.UserID === parseInt(this.userID)
          );

          if (existingPlantList) {
            // User already has a plant list, update it by adding selected plants
            const existingPlantIDs = existingPlantList.PlantIDs || [];
            const newPlantIDs = this.selectedPlantIDs.filter(
              (id) => !existingPlantIDs.includes(id)
            );

            if (newPlantIDs.length > 0) {
              console.log('Updating plant list for user:', this.userID);

              // Send a request to update the existing plant list with the new plants
              const response = await fetch('http://localhost:8080/plantlists/update', {
                method: 'PATCH', // Use PATCH to update existing list
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  UserID: this.userID,
                  PlantIDs: [...existingPlantIDs, ...newPlantIDs], // Merge existing with new plant IDs
                }),
              });

              if (!response.ok) {
                throw new Error('Failed to update plant list');
              }

              // Update the local plant lists array after the successful update
              const updatedPlantLists = await response.json();
              this.allPlantlists = updatedPlantLists;
              console.log('Updated plant lists:', this.allPlantlists);
            } else {
              console.log('No new plants to add');
            }
          } else {
            // User doesn't have an existing plant list, create a new one
            console.log('Creating new plant list for user:', this.userID);

            const response = await fetch('http://localhost:8080/plantlists', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                UserID: this.userID,
                PlantIDs: this.selectedPlantIDs,
              }),
            });

            if (!response.ok) {
              throw new Error('Failed to add plants');
            }

            // Update the local plant lists array after successful creation
            const newPlantList = await response.json();
            this.allPlantlists.push(newPlantList); // Add the new plant list to the local array
            console.log('Created new plant list:', newPlantList);
          }

          // Update selectedPlantNames based on selectedPlantIDs
          this.selectedPlantNames = this.allPlants
            .filter((plant) => this.selectedPlantIDs.includes(plant.PlantID))
            .map((plant) => plant.PlantName);
        } catch (error) {
          alert('Error: ' + error.message); // Display error message if the request fails
        }
      } else {
        console.error('Error adding plants:', error);
        alert('Error: ' + error.message);
      }
    },
  },
};

</script>

<style scoped>
/* Add styles for the form and table if needed */
</style>
