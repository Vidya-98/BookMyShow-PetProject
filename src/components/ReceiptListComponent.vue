<template>
  <div>
    <div class="movie-title-receipt button-div">
      Recent Bookings
    </div>
    <div v-for="(receipt, index) in receipts" :key="index" class="receipt-item">
      <div class="receipt-container">
        <div class="side-header">
          <div class="info-item">
            <div class="label">Movie Title:</div>
            <div class="content">{{ receipt.movieTitle }}</div>
          </div>

          <div class="info-item">
            <div class="label">Number of Tickets:</div>
            <div class="content">{{ receipt.seatCount }}</div>
          </div>

          <div class="info-item">
            <div class="label">Total Price:</div>
            <div class="content">{{ receipt.totalPrice }}</div>
          </div>

          <div class="info-item">
            <div class="label">User Name:</div>
            <div class="content">{{ receipt.userName }}</div>
          </div>

          
          <div v-if="receipt.selectedDate" class="info-item">
            <div class="label">Date:</div>
            <div class="content">{{ receipt.selectedDate.date }} {{ receipt.selectedDate.month }}</div>
          </div>

          <div v-if="receipt.selectedDate" class="info-item">
            <div class="label">Day:</div>
            <div class="content">{{ receipt.selectedDate.day }}</div>
          </div>

          <div class="info-item">
            <div class="label">Seat Category:</div>
            <div class="content">{{ receipt.seatCategory }}</div>
          </div>

          <div class="info-item">
            <div class="label">Theater Name:</div>
            <div class="content">{{ receipt.theaterName }}</div>
          </div>

          <div class="info-item">
            <div class="label">Showtime:</div>
            <div class="content">{{ receipt.showtime }}</div>
          </div>
        </div>

        <div class="movie-poster-bill">
          <img :src="getImageUrl(receipt.poster)" :alt="receipt.poster" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useReceiptStore } from '../store.js';
import { useRouter } from 'vue-router';

export default {
  name: 'ReceiptListComponent',
  setup() {
    const receiptStore = useReceiptStore();
    const router = useRouter();

    const closeAndNavigate = () => {
      router.push({ name: 'MoviePage' }); 
    };

    //  to check the receipt data
    console.log(receiptStore.receipts);

    return {
      receipts: receiptStore.receipts,
      closeAndNavigate,
    };
  },
  props:[
    'selectedDate'
  ],
  methods: {
    getImageUrl(posterPath) {
      return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : '';
    }
  }
};
</script>

<style scoped>

.close-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;
  background-color: rgb(231, 6, 126);
  color: white;
}
</style>
