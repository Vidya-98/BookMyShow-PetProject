<!-- src/components/SearchComponent.vue -->
<template>
      <input
        type="text"
        v-model="query"
        @input="searchMovies" class="input-search"
        placeholder="Search for a movie..."
      />
      <ModalPage :showModal="showModal" 
      :movies="movies" 
      @closeModal="toggleModal" />
  </template>
  
  <script>
  import ModalPage from "./ModalComponent.vue";
  import { API_KEY, API_URL } from '../secret.js';
  
  
  export default {
    name: "SearchComponent",
    components: {
      ModalPage,
    },
    data() {
      return {
        query: "",
        movies: [],
        showModal: false,
      };
    },
    methods: {
      toggleModal() {
        this.showModal = !this.showModal;
      },
      async searchMovies() {
        console.log('searchhhhhhhhhhhhh');
        if (this.query.trim() === "") {
          this.movies = [];
          console.log('if for queryyyyy');
          this.showModal = false;
          return;
        }
  
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`
          },
        };
  
        try {
          const response = await fetch(
            `${API_URL}/search/movie?query=${this.query}&include_adult=false&language=en-US&page=1`,
            options
          );
          const data = await response.json();
          this.movies = data.results;
          this.showModal = true;
        } catch (error) {
          console.error("Errorrrrrrrrrrrrrrrrrr", error);
        }
      },
    },
  };
  </script>
  