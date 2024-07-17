<template>
    <header>
      <router-link to="/movies" class="logo">
    <img src="..\src\assets\logo.png" alt="BookMyShow Logo">
  </router-link>
      <h1>
        Book My Show
      </h1>
      
      <div class="search">
         <SearchComponent />
      </div>
      
    </header>
  </template>
  
  <script>
import SearchComponent from './components/SearchComponent.vue'
  
  export default {
    name: 'HeaderPage',

    components:{
      SearchComponent
    }

  }
  </script>
  
  <style scoped>

  
  .logo img {
    height: 40px;
  }
  
  .nav-bar ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 20px;
  }
  
  .nav-bar ul li {
    display: inline;
  }
  
  .nav-bar ul li a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
  }
  
  
  
  .location select {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  /* input[type="text" i] {
    padding-block: 5px;
    padding-inline: 80px;
} */

.search-movie {
    flex: 1;
    padding: 18px;
    font-size: 20px;
    border: 1px solid #ccc;
    border-radius: 4px 0 0 4px;
    box-sizing: border-box;
    width: 500px;
    position:relative;
}
  </style>