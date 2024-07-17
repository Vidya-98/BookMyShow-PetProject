<template>
  <div>
    <div v-if="loading" class="loading-spinner">
      <LoadingSpinner :loading="loading"></LoadingSpinner>
    </div>
    <div v-if="movie && !loading" class="movie-details-page main">
      <div class="movie-poster">
        <img :src="getImageUrl(movie.poster_path)" alt="Movie Poster" />
      </div>
      <div class="movie-info">
        <div class="movie-details-row">
          <div>
            <div class="movie-title">
              {{ movie.title }}
            </div>
            <div class="side-header">
              <div class="info-item">
                <div class="label"><strong>Story Line:</strong></div>
                <div class="content">{{ movie.overview }}</div>
              </div>
              <div class="info-item">
                <div class="label"><strong>Release Date:</strong></div>
                <div class="content">{{ movie.release_date }}</div>
              </div>
              <div class="info-item">
                <div class="label"><strong>Rating:</strong></div>
                <div class="content">{{ movie.vote_average }}</div>
              </div>
              <div class="info-item">
                <div class="label"><strong>Popularity:</strong></div>
                <div class="content">{{ movie.popularity }}</div>
              </div>
              <div class="info-item" v-if="movie.genres && movie.genres.length">
                <div class="label"><strong>Genre:</strong></div>
                <div class="content">{{ movie.genres[0].name }}</div>
              </div>
            </div>
          </div>
          <div class="button-div">
            <button @click="bookTickets" :disabled="isUpcoming" :class="isUpcoming ? 'book-button-disabled' : 'book-button'">Book Tickets</button>
          </div>
        </div>

        <div class="cast-label label"><strong>Cast:</strong></div>
        <div class="cast-container" v-if="showCast && cast.length">
          <CastDetails  
            v-for="actor in cast" 
            :key="actor.cast_id"
            :actorDetails="actor"
            @deleteActor="deleteActor" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CastDetails from './components/CastDetails.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';
import { API_KEY, API_URL } from './secret.js';

export default {
  name: 'MovieDetailsPage',
  components: {
    CastDetails,
    LoadingSpinner
  },
  data() {
    return {
      movie: null,
      cast: [],
      showCast: false,
      loading: false,
      tab: this.$route.params.tab // Get the tab name from the route params
    };
  },
  computed: {
    isUpcoming() {
      return this.tab === 'Upcoming';
    },


  },
  methods: {
    async fetchMovieDetailsAndCredits() {
      const movieId = this.$route.params.id;
      const url = `${API_URL}/movie/${movieId}?language=en-US&append_to_response=credits`;
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
          throw new Error('Failed to fetch movie details and credits');
        }
        const data = await response.json();
        this.movie = data;
        this.cast = data.credits.cast;
        this.showCast = true;
      } catch (error) {
        console.error('Error fetching movie details and credits:', error);
      }
    },
    getImageUrl(posterPath) {
      return `https://image.tmdb.org/t/p/w500${posterPath}`;
    },
    // deleteActor(actorDetails) {
    //   this.cast = this.cast.filter(actor => actor.cast_id !== actorDetails.cast_id);
    // },

    // deleteActor(index) {
    //   this.cast.splice(index, 1); 
    // },

    // deleteActor(actorId) {
    //   this.cast = this.cast.filter(actor => actor.cast_id !== actorId); 
    // },
    
    deleteActor(actorDetails){
     console.log(actorDetails);
      const index = this.cast.findIndex(actor => actor.cast_id === actorDetails.cast_id);
      if(index !== -1){
        this.cast.splice(index,1);
      }
    },

    
    bookTickets() {
      this.$router.push({ 
        name: 'BookTicketComponent', 
        params: { 
          id: this.movie.id, 
          title: this.movie.title,
          posterpath: this.movie.poster_path 
        }
      });
    }
  },
  async created() {
    this.loading = true;
    await this.fetchMovieDetailsAndCredits();
    this.loading = false;
  }
}

</script>
