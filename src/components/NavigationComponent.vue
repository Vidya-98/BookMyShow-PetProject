<template>

<div class="navigation">
    <div class="button-div">
      <button class="payment-button" @click="goBackToHome()" >Home</button>
    </div>
    <div class="button-div">
        <button class="payment-button" @click="viewBookings()" >My Bookings</button>
      </div>
  </div>
  
</template>

<script>
export default {

    name:'NavigationComponent',
    methods:{

        viewBookings() {
      this.$router.push(
      { 
      name: 'HistoryScreen', 
      });
    },

    goBackToHome() {
      this.$router.push(
      { 
      name: 'MoviePage', 
      });
    },



    }

}
</script>

<style>

</style>