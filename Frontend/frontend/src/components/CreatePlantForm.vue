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
    const response = await fetch("http://localhost:8080/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.plant),
    });

    if (!response.ok) throw new Error("Failed to create plant");

    const newPlant = await response.json();

    // Emit the new plant to parent
    this.$emit("plantCreated", newPlant);

    // Optionally, refresh the entire plant list
    await this.$parent.fetchPlants();

    // Reset the form
    this.resetForm();
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

      <input class="w-100 mb-1" v-model="plant.PlantName" type="text" id="PlantName" placeholder="Plant Name" required />
    </div>
    <div>
      <textarea class="w-100 mb-1" v-model="plant.Description" id="Description" placeholder="Description" required></textarea>
    </div>
    <div class="mb-1">
      <label class="col-3" for="Size">Size:</label>
      <select class="col-9 text-center" v-model="plant.Size" id="Size">
        <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
      </select>
    </div>
    <div>
      <textarea class="w-100 mb-1" v-model="plant.PlantRequirements" id="PlantRequirements" placeholder="Requirements" required></textarea>
    </div>
    <div>
      <textarea class="w-100 mb-1" v-model="plant.PlantInstructions" id="PlantInstructions" placeholder="Instructions" required></textarea>
    </div>
    <div class="row d-flex justify-content-center">
      <button class="w-50" type="submit">Create Plant</button>

    </div>
  </form>
</template>

<style scoped class>
button {
  padding: 10px 20px;
  background-color: #ffffff; /* Match button color with header */
  color: #7D9883;
  border: none;
  border-radius: 20px;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
  transition: background-color 0.3s ease;
}
</style>