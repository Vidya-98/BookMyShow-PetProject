<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <button @click="closeModal" class="closeModal" v-if="!showReceipt">X</button>
      <div v-if="!showReceipt" class="side-header">
        <h3 class="payment-heading">Payment</h3>

        <div class="form-container">
          <div class="form-group">
            <label for="userName">User name:</label>
            <input type="text" id="userName" v-model="userName" />
          </div>
          <div class="form-group">
            <label for="mobileNumber">Mobile Number:</label>
            <input type="text" id="mobileNumber" v-model="mobileNumber" />
          </div>
        </div>

        <div class="button-div">
          <button @click="validateAndGenerateReceipt" class="payment-button">Generate Receipt</button>
        </div>
      </div>
      <ReceiptComponent
        v-if="showReceipt"
        :userName="userName"
        :seatCount="seatCount"
        :totalPrice="totalPrice"
        :mobileNumber="mobileNumber"
        :seatCategory="seatCategory"
        :theaterName="theaterName"
        :showtime="showtime"
        :movieTitle="movieTitle"
        :movieId="movieId"
        :posterPath="poster"
        :selectedDate="showDate"
        @close="closeReceipt"
      />
    </div>
  </div>
</template>

<script>
import ReceiptComponent from './ReceiptComponent.vue';
import { useReceiptStore } from '../store.js';

export default {
  name: 'PaymentPage',
  props: [
    'show',
    'seatCount',
    'seatCategory',
    'theaterName',
    'movieTitle',
    'movieId',
    'showtime',
    'poster',
    'showDate'
  ],
  data() {
    console.log('null', this.showDate);
    return {
      userName: '',
      mobileNumber: '',
      showReceipt: false,
      totalPrice: 0,
      selectedDate: {}
    };
  },
  methods: {
    validateAndGenerateReceipt() {
      if (this.userName === '' || this.mobileNumber === '') {
        alert('Please fill all the fields');
      } else {
        this.generateReceipt();
      }
    },
    generateReceipt() {
      this.totalPrice = this.seatCount * 100; // Calculate total price
      this.showReceipt = true;

      const receiptStore = useReceiptStore();
      const newReceipt = {
        userName: this.userName,
        seatCount: this.seatCount,
        totalPrice: this.totalPrice,
        mobileNumber: this.mobileNumber,
        seatCategory: this.seatCategory,
        theaterName: this.theaterName,
        showtime: this.showtime,
        movieTitle: this.movieTitle,
        movieId: this.movieId,
        poster: this.poster
      };
      receiptStore.addReceipt(newReceipt);
    },
    closeModal() {
      this.$emit('close'); // Emit close event
    },
    closeReceipt() {
      this.showReceipt = false;
      this.closeModal();
    }
  },
  components: {
    ReceiptComponent
  }
};
</script>

<style scoped>
.form-container {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-div {
  text-align: center;
  margin-top: 20px;
}

.payment-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: rgb(231, 6, 126);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.payment-button:hover {
  background-color: rgb(231, 6, 126);
}
</style>
