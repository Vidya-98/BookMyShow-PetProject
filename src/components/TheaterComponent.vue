<template>
  <h2 class="theater-header">{{ movieTitle }}</h2>
  <div class="main">
    <div v-for="(theater, index) in theaters" :key="index" class="theateritem">
      <div class="theaterinfo">
        <h4>{{ theater.theaterName }}</h4>
        <p>{{ theater.location }}</p>
      </div>
      <div class="showtimings">
        <span 
          v-for="(time, timeIndex) in theater.show_timings" 
          :key="timeIndex" 
          class="showtime" 
          :class="{ disabled: isPastShowtime(time) }" 
          @click="isPastShowtime(time) ? null : selectShowtime(theater, time)"
        > 
          {{ time }}
        </span>
      </div>
    </div>
  </div>

  <SeatComponent
    v-if="showSeatModal"
    :show="showSeatModal"
    :theaterName="selectedTheater.theaterName"
    :movieTitle="movieTitle"
    :movieId="movieId"
    :poster="poster"
    :showtime="selectedShowtime"
    @close="closeSeatModal"
    :showDate="showDate"
  />
</template>

<script>
import SeatComponent from './SeatComponent.vue';

export default {
  name: 'TheaterComponent',
  props: ['theaters', 'poster', 'showDate'],
  data() {
    return {
      movieTitle: this.$route.params.title || 'Movie Title',
      movieId: this.$route.params.id || "",
      showSeatModal: false,
      selectedTheater: null,
      selectedShowtime: null,
    };
  },
  computed: {
    currentTime() {
      const now = new Date();
      const day = now.toLocaleString('default', { weekday: 'short' }).toUpperCase();
      const date = now.getDate();
      const month = now.toLocaleString('default', { month: 'short' }).toUpperCase();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const adjustedHours = hours % 12 || 12;
    
      return { day, date, month, adjustedHours, minutes, ampm };
    },
  },
  methods: {
    selectShowtime(theater, showtime) {
      if (!this.isPastShowtime(showtime)) {
        this.selectedTheater = theater;
        this.selectedShowtime = showtime;
        this.showSeatModal = true;
      }
    },
    isPastShowtime(showtime) {
      const [time, period] = showtime.split(' ');
      const [showHours, showMinutes] = time.split(':').map(Number);
      const showAdjustedHours = period === 'PM' && showHours !== 12 ? showHours + 12 : showHours === 12 && period === 'AM' ? 0 : showHours;
      const { day: currentDay, date: currentDate, month: currentMonth, adjustedHours: currentHours, minutes: currentMinutes } = this.currentTime;

      const isSameDay = currentDay === this.showDate.day && currentDate === this.showDate.date && currentMonth === this.showDate.month;
      if (!isSameDay) {
        return false;
      }

      const isPast = showAdjustedHours < currentHours || (showAdjustedHours === currentHours && showMinutes <= currentMinutes);
      return isPast;
    },
    closeSeatModal() {
      this.showSeatModal = false;
    },
  },
  components: {
    SeatComponent
  }
};
</script>

<style scoped>
.disabled {
  pointer-events: none;
  color: gray;
}
</style>
