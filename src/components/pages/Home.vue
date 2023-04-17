<template>
  <div>
    <h1>Home</h1>
    <router-link to="/countries">Country List</router-link>
    <router-link to="/cities">City List</router-link>
    <router-link to="/country/action">Add Country</router-link>
    <router-link to="/city/action">Add City</router-link>
    <router-view></router-view>
  </div>
</template>
  
  <script>
export default {};
</script>
  