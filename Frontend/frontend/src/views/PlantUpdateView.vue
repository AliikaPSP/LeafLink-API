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
        Size: 'Small',
        PlantRequirements: '',
        PlantInstructions: ''
      },
      sizes: ["Small", "Medium", "Large"]
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
  <main class="form-card">
    <h1 class="text-center text-white">Update Plant</h1>
    
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <form @submit.prevent="updatePlant">
        <div>
          <label class="col-12" for="PlantName">Plant Name:</label>
          <input class="col-12 mb-1" type="text" v-model="updatedPlant.PlantName" placeholder="Plant Name" id="PlantName" required />
        </div>
        <div>
          <label class="col-12" for="Description">Description:</label>
          <textarea class="col-12 mb-1" v-model="updatedPlant.Description" id="Description" required></textarea>
        </div>
        <div>
          <label class="col-2" for="Size">Size:</label>
          <select class="col-10 text-center mb-1" v-model="plant.Size" id="Size">
            <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
          </select>
        </div>
        <div>
          <label class="col-12" for="PlantRequirements">Plant Requirements:</label>
          <textarea class="col-12 mb-1" v-model="updatedPlant.PlantRequirements" id="PlantRequirements" required></textarea>
        </div>
        <div>
          <label class="col-12" for="PlantInstructions">Plant Instructions:</label>
          <textarea class="col-12 mb-1" v-model="updatedPlant.PlantInstructions" id="PlantInstructions" required></textarea>
        </div>
        <div class="row d-flex justify-content-center">
          <button class="w-50" type="submit">Update Plant</button>
        </div>
      </form>
    </div>
  </main>
</template>
