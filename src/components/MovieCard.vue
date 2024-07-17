<template>
  <div class="movie-list" @click="$emit('viewMovieDetails', movieId)">
    <img :src="getImageUrl(posterPath)" alt="Movie Poster">
    <h2>{{ title }}</h2>        
  </div>
</template>

<script>
export default {

    props :
        ['posterPath',
        'title',
    'movieId',],

  data() {
    return {
      movie: null,
    };
  },
    methods :{
        getImageUrl(posterPath) {
      return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : '';
    },
  }
}

</script>

