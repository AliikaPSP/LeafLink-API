<script>
export default {
  data() {
    return {
      plant: null,
      loading: true,
      error: null,
      updatedPlant: {
        PlantName: '',
        Description: '',
        Size: '',
        PlantRequirements: '',
        PlantInstructions: ''
      }
    };
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const response = await fetch(`http://localhost:8080/plants/${id}`);
      if (!response.ok) throw new Error('Failed to fetch plant details');
      this.plant = await response.json();
      this.updatedPlant = { ...this.plant };
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async updatePlant() {
      const id = this.$route.params.id;
      try {
        const response = await fetch(`http://localhost:8080/plants/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.updatedPlant),
        });

        if (!response.ok) throw new Error('Failed to update plant');
        
        // Redirect the user back to the plant details page after update
        this.$router.push({ name: 'plantDetails', params: { id } });
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>

<template>
  <main>
    <h1>Update Plant</h1>
    
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <form @submit.prevent="updatePlant">
        <div>
          <label for="PlantName">Plant Name:</label>
          <input type="text" v-model="updatedPlant.PlantName" id="PlantName" required />
        </div>
        <div>
          <label for="Description">Description:</label>
          <textarea v-model="updatedPlant.Description" id="Description" required></textarea>
        </div>
        <div>
          <label for="Size">Size:</label>
          <input type="text" v-model="updatedPlant.Size" id="Size" required />
        </div>
        <div>
          <label for="PlantRequirements">Plant Requirements:</label>
          <textarea v-model="updatedPlant.PlantRequirements" id="PlantRequirements" required></textarea>
        </div>
        <div>
          <label for="PlantInstructions">Plant Instructions:</label>
          <textarea v-model="updatedPlant.PlantInstructions" id="PlantInstructions" required></textarea>
        </div>
        <button type="submit">Update Plant</button>
      </form>
    </div>
  </main>
</template>
