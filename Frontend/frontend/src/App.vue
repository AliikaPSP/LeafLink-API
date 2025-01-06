<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/" class="nav-btn">Home</RouterLink>
        <RouterLink to="/plantsView" class="nav-btn">Plants</RouterLink>
        <RouterLink to="/usersView" class="nav-btn">Users</RouterLink>
        <RouterLink to="/plantListView" class="nav-btn">Plant Lists</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />

  <MDBContainer class="my-4" style="height: 50px">
    <!-- Footer -->
    <MDBFooter bg="primary" :text="['white', 'center', 'lg-start']" class="fixed-bottom">
      <!-- Copyright -->
      <div class="text-center p-3" style="background-color: #A2B09B;">
        © 2024 Copyright:
        <a class="text-white" >LeafLink</a>
      </div>
      <!-- Copyright -->
    </MDBFooter>
  </MDBContainer>
  
</template>



<style scoped>

.nav-btn {
  display: inline-block;
  padding: 10px 20px;
  margin: 5px;
  background-color: #7D9883; /* Custom background color */
  color: white;
  border: none;
  border-radius: 20px;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */
}

.nav-btn:hover {
  background-color: #A2B09B; /* Lighter shade of the custom color on hover */
}
/* Ensure header is at the top */
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(6, 108, 23, 0); /* Set transparency */
  color: white;
  z-index: 100; /* Keep header above other content */
  padding: 1rem;
  line-height: 1.5;
  backdrop-filter: blur(5px); /* Optional: adds a blur effect behind the header */
  border-bottom: 2px solid transparent;
  border-image: linear-gradient(to right, rgba(162, 176, 155, 0), #A2B09B, rgba(162, 176, 155, 0)) 1;
}

/* Ensure no conflicting background color in body */
body {
  margin-top: 5rem; /* Adjust to avoid content being hidden by fixed header */
  background-color: #e6e4d7; /* This makes the background color visible behind the transparent header */
}
nav {
  display: flex;
  justify-content: center;
  font-size: 14px; /* Increased font size for better visibility */
}

nav a {
  color: white;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-left: 1px solid #e6e4d7;
}

nav a:first-of-type {
  border-left: none; /* No border for the first item */
}

nav a:hover {
  background-color: #A2B09B;
}

nav a.router-link-exact-active {
  color: #e6e4d7;
}

/* Add margin to body to avoid content being hidden behind the header */
body {
  margin-top: 5rem; /* Adjust this based on the height of the header */
}
footer {
  background-color: #7D9883;
  color: #fff;
  text-align: center;
  padding: 1rem;
  margin-top: auto; /* Ensures footer stays at the bottom */
}

/* Responsive Design for Larger Screens */
@media (min-width: 1024px) {
  nav {
    font-size: 16px;
  }
}
</style>
