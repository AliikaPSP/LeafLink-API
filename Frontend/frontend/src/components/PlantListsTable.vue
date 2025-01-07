<script>
export default {
    name: "PlantListsTable",
    props: {
        items: Array
    }
}
</script>

<template>
    <table class="custom-table">
        <thead>
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

<style scoped>
.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0px 0;
  font-size: 1rem;
  text-align: left;
  background-color: #e6e4d7;
}

.custom-table thead {
  background-color: #7D9883;
  color: white;
  font-weight: bold;
}

.custom-table th, .custom-table td {
  border: 1px solid #ddd;
  padding: 12px 15px;
}

.custom-table tbody tr td {
  color: #618068;
}

.custom-table tbody tr:nth-child(even) {
  background-color: #f4f4f4;
}

.custom-table tbody tr:hover {
  background-color: #e0e0e0;
}
</style>
