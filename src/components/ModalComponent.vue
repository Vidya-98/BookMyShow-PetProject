<template>
  <div class="modal" v-if="showModal">
    <div class="modalcontent">
      <span class="close" @click="$emit('closeModal')">&times;</span>
      <ul>
        <li v-for="movie in movies" :key="movie.id" @click="viewMovieDetails(movie.id)">
          <div class="movie-poster-bill-list">
            <img :src="getImageUrl(movie.poster_path)" alt="Movie Poster" class="movie-poster" />
          </div>
          <div>
            {{ movie.title }}
          </div>
        </li>      
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalPage",
  props: [
    'showModal',
    'movies'
  ],
  methods:{
    viewMovieDetails(movieId) {
      this.$emit('closeModal');
      this.$router.push(
      { 
        name: 'MovieDetailsPage', 
        params: { id: movieId }
      });
    },
    getImageUrl(posterPath) {
      return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : '';
    }
  }
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modalcontent {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
}

li img {
  margin-right: 10px;
  width: 50px;
  height: 75px;
}
</style>
