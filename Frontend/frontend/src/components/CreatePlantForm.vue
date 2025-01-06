<script>
export default {
  data() {
    return {
      plant: {
        PlantName: "",
        Description: "",
        Size: "Small", // Default value
        PlantRequirements: "",
        PlantInstructions: ""
      },
      sizes: ["Small", "Medium", "Large"] // Enum values for Size
    };
  },
  methods: {
    async createPlant() {
      try {
        // Send POST request to backend
        const response = await fetch("http://localhost:8080/plants", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.plant)
        });

        if (!response.ok) throw new Error("Failed to create plant");

        const newPlant = await response.json();
        this.$emit("plantCreated", newPlant); // Notify parent component to update plant list
        alert("Plant created successfully!");
        this.resetForm(); // Reset the form after successful submission
      } catch (err) {
        console.error("Error creating plant:", err);
        alert("Failed to create plant. Please try again.");
      }
    },
    resetForm() {
      this.plant = {
        PlantName: "",
        Description: "",
        Size: "Small",
        PlantRequirements: "",
        PlantInstructions: ""
      };
    }
  }
};
</script>

<template>
  <form @submit.prevent="createPlant">
    <h2>Create a New Plant</h2>
    <div>
      <label for="PlantName">Plant Name:</label>
      <input v-model="plant.PlantName" type="text" id="PlantName" required />
    </div>
    <div>
      <label for="Description">Description:</label>
      <textarea v-model="plant.Description" id="Description" required></textarea>
    </div>
    <div>
      <label for="Size">Size:</label>
      <select v-model="plant.Size" id="Size">
        <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
      </select>
    </div>
    <div>
      <label for="PlantRequirements">Requirements:</label>
      <textarea v-model="plant.PlantRequirements" id="PlantRequirements" required></textarea>
    </div>
    <div>
      <label for="PlantInstructions">Instructions:</label>
      <textarea v-model="plant.PlantInstructions" id="PlantInstructions" required></textarea>
    </div>
    <button type="submit">Create Plant</button>
  </form>
</template>
