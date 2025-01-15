<template>
    <main class="form-card">
      <h1 class="text-white">Plant List Details</h1>
  
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">
        <p>Error: {{ error }}</p>
      </div>
      <div v-else>
        <form @submit.prevent="updatePlantList">
          <div>
            <label for="plantListID">PlantList ID:</label>
            <div id="plantListID" class="value-row">{{ plantList.PlantListID }}</div>
          </div>
          <div>
            <label for="userID">User ID:</label>
            <div id="userID" class="value-row">{{ plantList.UserID }}</div>
          </div>
          <div>
            <label class="col-12" for="plantID">Plant ID:</label>
            <input
              class="col-12 mb-1"
              type="text"
              v-model="plantList.PlantID"
              placeholder="Plant ID"
              id="plantID"
              required
            />
          </div>
          <div class="row d-flex justify-content-center">
            <button class="w-50" type="submit">Update Plant List</button>
          </div>
        </form>
      </div>
    </main>
  </template>
  
  <script>
export default {
  data() {
    return {
      plantList: null, // Correct naming
      loading: true,
      error: null,
    };
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const response = await fetch(`http://localhost:8080/plantlists/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch plant list details: ${response.statusText}`);
      }
      const data = await response.json();
      this.plantList = data; // Use consistent naming
    } catch (err) {
      console.error(err);
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async updatePlantList() {
      try {
        const id = this.$route.params.id;
        if (!this.plantList.UserID || !this.plantList.PlantID) {
          alert("User ID and Plant ID are required.");
          return;
        }

        const requestData = {
          UserID: this.plantList.UserID,
          PlantID: this.plantList.PlantID,
        };

        const response = await fetch(`http://localhost:8080/plantlists/${id}/update`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          throw new Error(`Failed to update plant list: ${response.statusText}`);
        }

        this.$router.push({ name: "plantListView" });
        alert("Plant list updated successfully");
      } catch (err) {
        console.error(err);
        this.error = err.message;
      }
    },
  },
};
</script>