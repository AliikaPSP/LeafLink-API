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
                <th>PlantID</th>
                <th>PlantName</th>  
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.PlantID">
                <td>{{ item.PlantID }}</td>
                <td>{{ item.PlantName }}</td>
            </tr>
        </tbody>
    </table>
</template>