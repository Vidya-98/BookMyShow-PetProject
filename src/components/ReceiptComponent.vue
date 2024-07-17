<template>
  <div>
    <div v-if="loading" class="loading-spinner loading-spinner-custom">
      <LoadingSpinner :loading="loading"></LoadingSpinner>
    </div>
    <div>
      <h2>RECEIPT</h2>
      <div class="receipt-container">
        <div class="side-header">
          <div class="info-item">
            <div class="label">Movie Title:</div>
            <div class="content">{{ movieTitle }}</div>
          </div>
          <div class="info-item">
            <div class="label">Number of Tickets:</div>
            <div class="content">{{ seatCount }}</div>
          </div>
          <div class="info-item">
            <div class="label">Total Price:</div>
            <div class="content">{{ totalPrice }}</div>
          </div>
          <div class="info-item">
            <div class="label">User Name:</div>
            <div class="content">{{ userName }}</div>
          </div>
          <div class="info-item">
            <div class="label">Mobile Number:</div>
            <div class="content">{{ mobileNumber }}</div>
          </div>
          <div class="info-item">
            <div class="label">Seat Category:</div>
            <div class="content">{{ seatCategory }}</div>
          </div>
          <div class="info-item">
            <div class="label">Theater Name:</div>
            <div class="content">{{ theaterName }}</div>
          </div>
          <div class="info-item">
            <div class="label">Showtime:</div>
            <div class="content">{{ showtime }}</div>
          </div>
          <div class="info-item" v-if="selectedDate">
            <div class="label">Date:</div>
            <div class="content">{{ selectedDate.date }} {{ selectedDate.month }}</div>
          </div>
          <div class="info-item" v-if="selectedDate">
            <div class="label">Day:</div>
            <div class="content">{{ selectedDate.day }}</div>
          </div>
        </div>
        <div class="movie-poster-bill img">
          <img :src="getImageUrl()" :alt="posterPath" />
        </div>
      </div>
      <div class="button-div">
        <button @click="closeModal" class="payment-button">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from './LoadingSpinner.vue';

export default {
  name: 'ReceiptComponent',
  props: [
    'userName',
    'seatCount',
    'totalPrice',
    'mobileNumber',
    'seatCategory',
    'theaterName',
    'showtime',
    'movieTitle',
    'movieId',
    'posterPath',
    'selectedDate' //selected date
  ],
  components: { LoadingSpinner },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    closeModal() {
      this.loading = true;
      setTimeout(()=>{
        this.loading = false;
        this.$emit('close');
        this.$router.push({
          name: 'MoviePage'
        })
      }, 2000);
    },
    getImageUrl() {
      return this.posterPath ? `https://image.tmdb.org/t/p/w500${this.posterPath}` : '';
    }
  }
};
</script>

<style scoped>
.new {
  display: flex;
  flex-direction: column;
}
</style>
