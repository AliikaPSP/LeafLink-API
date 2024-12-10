<script>
export default {
    name: "UsersTable",
    props: {
        items: Array
    }
}
</script>

<template>
    <table class="table table-striped">
        <thead class ="table-dark">
            <tr>
                <th>FirstName</th>
                <th>LastName</th>
                <th>UserName</th>
                <th>Email</th>
                <th>Password</th>
                <th>PlantList</th>    
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.UserID">
                <td>{{ item.FirstName }}</td>
                <td>{{ item.LastName }}</td>
                <td>{{ item.UserName }}</td>
                <td>{{ item.Email }}</td>
                <td>{{ item.Password }}</td>
                <td>{{ item.PlantList }}</td>
            </tr>
        </tbody>
    </table>
</template>