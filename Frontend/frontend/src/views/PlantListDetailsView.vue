<script>
export default {
  data() {
    return {
      plantList: null,
      loading: true,
      error: null,
    };
  },
  async created() {
    const plantListId = this.$route.params.id; // Get the plant list ID from the URL
    try {
      const response = await fetch(`http://localhost:8080/plantlists/${plantListId}`);
      if (!response.ok) throw new Error("Failed to fetch plant list details");
      this.plantList = await response.json();
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  },
};
</script>

<template>
  <main class="form-card">
    <h1 class="text-white">Plant List Details</h1>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <p><strong>Plant List ID:</strong> {{ plantList.PlantListID }}</p>
      <p><strong>User ID:</strong> {{ plantList.UserID }}</p>
      <p><strong>Plant ID:</strong> {{ plantList.PlantID }}</p>
    </div>
  </main>
</template>
