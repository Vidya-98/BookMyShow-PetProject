<template>
  <div v-if="show && !showPaymentModal" class="modal">
    <div v-if="isLoading" class="loading-spinner">
      <LoadingSpinner :loading="isLoading"></LoadingSpinner>
    </div>
      
    <div v-else class="modal-content">
      <button class="closeModal" @click="closeModal">X</button>
      <div class="selection-container">
        <h2 class="seatcount">How many seats?</h2>
        <h3 class="number-count">{{ count }}</h3>
        <div class="count-symbol">
          <button @click="subFromCount" class="button">-</button>
          <button @click="addToCount" class="button"><span>+</span></button>
        </div>
      </div>
      <div>
        <label for="seatCategory">Seat Category:</label>
        <select v-model="seatCategory" id="seatCategory" class="seatcategory">
          <option value="" disabled selected>Select seat category</option>
          <option value="Platinum">Platinum</option>
          <option value="Gold">Gold</option>
        </select>
      </div>
      <div class="button-div">
        <button class="payment-button" @click="validateAndOpenPaymentModal">Make Payment</button>
      </div>
    </div>
  </div>
  <div v-else>
    <PaymentPage
      v-if="showPaymentModal && !isLoading"
      :show="showPaymentModal"
      :seatCount="count"
      :seatCategory="seatCategory"
      :theaterName="theaterName"
      :movieTitle="movieTitle"
      :movieId="movieId"
      :showtime="showtime"
      :poster="poster"
      :showDate="showDate"
      @close="closePaymentModal"
    />
  </div>
</template>

<script>
import LoadingSpinner from './LoadingSpinner.vue';
import PaymentPage from './PaymentModal.vue';

export default {
  name: 'SeatComponent',
  props: [
    'show',
    'theaterName',
    'movieTitle',
    'showtime',
    'movieId',
    'poster',
    'showDate'
  ],
  data() {
    console.log('null1', this.showDate);
    return {
      count: 0,
      seatCategory: '',
      showPaymentModal: false,
      isLoading: false,
    };
  },
  methods: {
    addToCount() {
      this.count += 1;
    },
    subFromCount() {
      if (this.count > 0) {
        this.count -= 1;
      }
    },
    validateAndOpenPaymentModal() {
      if (this.count === 0 || this.seatCategory === '') {
        alert('Please fill all the fields');
      } else {
        this.openPaymentModal();
      }
    },
    openPaymentModal() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false; 
        this.showPaymentModal = true;
      }, 2000);
    },
    closePaymentModal() {
      this.showPaymentModal = false;
      this.$emit('close');
    },
    closeModal() {
      this.$emit('close');
    }
  },
  components: {
    PaymentPage,
    LoadingSpinner
  }
};
</script>