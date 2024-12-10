<script>
export default {
    name: "PlantsTable",
    props: {
        items: Array
    }
}
</script>

<template>
    <table class="table table-striped">
        <thead class ="table-dark">
            <tr>
            <th>PlantName</th>
            <th>Description</th>
            <th>Size</th>
            <th>PlantRequirements</th>
            <th>PlantInstructions</th>    
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.PlantID">
                <td>{{ item.PlantName }}</td>
                <td>{{ item.Description }}</td>
                <td>{{ item.Size }}</td>
                <td>{{ item.PlantRequirements }}</td>
                <td>{{ item.PlantInstructions }}</td>
            </tr>
        </tbody>
    </table>
</template>