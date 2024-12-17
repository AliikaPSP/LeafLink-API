<script>
export default {
  data() {
    return {
      plant: null,
      loading: true,
      error: null
    };
  },
  async created() {
    const plantId = this.$route.params.id;  // Get the plant id from the URL
    try {
      const response = await fetch(`http://localhost:8080/plants/${plantId}`);
      if (!response.ok) throw new Error('Failed to fetch plant details');
      this.plant = await response.json();
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }
};
</script>

<template>
  <main>
    <h1>Plant Details</h1>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <p><strong>Plant ID:</strong> {{ plant.PlantID }}</p>
      <p><strong>Plant Name:</strong> {{ plant.PlantName }}</p>
      <p><strong>Description:</strong> {{ plant.Description }}</p>
      <p><strong>Size:</strong> {{ plant.Size }}</p>
      <p><strong>Plant Requirements:</strong> {{ plant.PlantRequirements }}</p>
      <p><strong>Plant Instructions:</strong> {{ plant.PlantInstructions }}</p>
    </div>
  </main>
</template>
