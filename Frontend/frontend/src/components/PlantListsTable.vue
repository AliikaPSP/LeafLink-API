<script>
export default {
    name: "PlantListsTable",
    props: {
        items: Array
    }
}
</script>

<template>
    <table class="table table-striped">
        <thead class ="table-dark">
            <tr>
            <th>UserID</th>
            <th>PlantID</th>  
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.PlantListID">
                <td>{{ item.UserID }}</td>
                <td>{{ item.PlantID }}</td>
            </tr>
        </tbody>
    </table>
</template>