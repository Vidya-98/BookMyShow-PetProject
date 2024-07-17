<template>
  <div id="app1">
    <HeaderPage />
    <!-- <BannerComponent /> -->
    <ModalPage />
    <MovieDetailsPage />
  
    <nav>
      <!-- <router-link to="/movies">Movie Page</router-link> -->
      <!-- <router-link to="/payment">Payment Page</router-link>
      <router-link to="/modal">Modal Page</router-link> -->
      <!-- <router-link to="/movieDetails">MovieDetails Page</router-link> -->
      
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderPage from './HeaderPage.vue';
//import BannerComponent from '../src/BannerComponent.vue';
import ModalPage from './components/ModalComponent.vue';
import MovieDetailsPage from './MovieDetailsPage.vue';

export default {
  name: 'App',
  components: {
    HeaderPage,
    //BannerComponent,
    ModalPage,
    MovieDetailsPage

  }
}
</script>