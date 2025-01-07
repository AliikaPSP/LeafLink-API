<script>
export default {
    name: "UsersTable",
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
                <th>UserName</th> 
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.UserID">
                <td>{{ item.UserID }}</td>
                <td>{{ item.UserName }}</td>
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
  background-color: #e6e4d7; /* Body background color */
}

.custom-table thead {
  background-color: #7D9883; /* Header background color */
  color: white;
  font-weight: bold;
}

.custom-table th, .custom-table td {
  border: 1px solid #ddd;
  padding: 12px 15px;
}

/* Change body text color */
.custom-table tbody tr td {
  color: #618068;
}

.custom-table tbody tr:nth-child(even) {
  background-color: #f4f4f4; /* Stripe effect */
}

.custom-table tbody tr:hover {
  background-color: #e0e0e0; /* Hover effect */
}
</style>