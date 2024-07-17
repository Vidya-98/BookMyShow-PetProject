<template>
  <div>
    
    <div class="menu">
      <div class="nav-bar-home">
        <div>
          <ul>
            <li v-for="(tab,index) in tabs" 
            :key="index"
            @click="selectTab(index)" 
            :class="{ active: selectedTab === index }">
              {{ tab.name }}
            </li>
          </ul>
        </div>
        <div class="button-div">
          <button class="payment-button" @click="viewBookings()" >
            My Bookings
          </button>
        </div>
      </div>
      <div class="tab-content">
        <p>{{ tabs[selectedTab].content }}</p>
      </div>
    </div>
    <div class="banner">
      <img src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/stream-leadin-web-collection-202210241242.png" alt="Stream" width="100%" height="100%">
    </div>

    <div class="tab-header">
       <h2 class="tab-selected">
         {{ tabs[selectedTab].name }}
         <hr>
       </h2>
       
    </div>
    

    <div class="main">
        <MovieCard 
        v-for="movie in movies" :key="movie.id"
        :posterPath="movie.poster_path" 
        :title="movie.title"
        @viewMovieDetails="viewMovieDetails(movie.id,selectTab)"
        :movieId="movie.id"
        />
    </div>
    
   
  </div>
</template>

<script>
import MovieCard from './components/MovieCard.vue';
import { API_KEY, API_URL } from './secret.js';




export default { 
  
  components :{
    MovieCard
  },

  name: 'MoviePage',

  data() {
    return {
      movies: [],
      selectedTab: 0,
      tabs: [
        {
          name: 'Now Playing', //0
          api: 'now_playing',
        },
        {
          name: 'Popular',
          api: 'popular',   //1
        },
        {
          name: 'Top Rated',
          api: 'top_rated', //2
        },
        {
          name: 'Upcoming',
          api: 'upcoming', //3
        }
      ]
    };
  },
  methods: {
  async fetchMovies(api){
    const url = `${API_URL}/movie/${api}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`
        }
      });
      if (!response.ok) {
        throw new Error('Network issue!!!!');
      }
      const data = await response.json();
      this.movies = data.results;
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  },
  getImageUrl(posterPath) {
    return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : '';
  },
  
  viewMovieDetails(movieId) {
    console.log('vvvvvvv', this.tabs[this.selectedTab].name);
    this.$router.push(
      { 
        name: 'MovieDetailsPage', 
        params: { 
          id: movieId,
          tab: this.tabs[this.selectedTab].name  // Pass the tab name here
        }
      }
    );
  },
  selectTab(index) {
    this.selectedTab = index;
    this.fetchMovies(this.tabs[index].api);
  },
  viewBookings() {
    this.$router.push(
    { 
      name: 'HistoryScreen'
    });
  },
},

created() {
  this.fetchMovies(this.tabs[this.selectedTab].api);
}
}
</script>

<style scoped>

img {
  width: 75%;
  height: auto;
  display: block;
  align-content: center;
}
h2 {
  text-align: center;
  font-size: 1.5rem;
  margin: 20px 0 0 0;
  margin-bottom: 20px;
}
img.banner {
  object-fit: cover;
  transition: visibility 0s ease 0s, opacity 0.3s linear 0s;
  opacity: 1;
  visibility: visible;
}  

.tab-selected {
  color: rgb(231, 6, 126);
}

.tab-header {
  display: flex;
  justify-content: flex-start;
  margin-left: 30px;
}
 
 
button {
  padding: 10px 20px;
  font-size: 16px;
  border: 1px;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;
  background-color: rgb(231, 6, 126);
  color: white;
}

.nav-bar-home {
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items:center;
}


</style>