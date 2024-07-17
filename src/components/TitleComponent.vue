<template>
  <div v-if="movieTitle">
    <!-- <h2 class="titlecomponent">{{ movieTitle }}</h2> -->
  </div>
</template>

<script>
import { API_KEY, API_URL } from '../secret.js';
export default {
  name: 'TitleComponent',
  props: [
    'movieId',
  ],
  data() {
    return {
      movieTitle: ''
    };
  },
  methods: {
    async fetchMovieTitle() {
      const url = `${API_URL}/movie/${this.movieId}?language=en-US`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`
        }
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Failed to fetch movie title');
        }
        const data = await response.json();
        this.movieTitle = data.title;
      } catch (error) {
        console.error('Error fetching movie title:', error);
      }
    }
  },
  watch: {
    movieId: 'fetchMovieTitle'
  },
  created() {
    this.fetchMovieTitle();
  }
};
</script>

