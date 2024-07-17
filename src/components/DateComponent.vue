<template>
  <div>
    <div class="date-display">
      <div
        v-for="(dateInd, index) in dates"
        :key="index"
        class="date-item"
        :class="{ selected: index === selectedIndex }"
        @click="selectDate(index)">
        <div class="day">{{ dateInd.day }}</div>
        <div class="date">{{ dateInd.date }} {{ dateInd.month }}</div>
      </div>
    </div>
  </div>
  <div>
    <TheaterComponent 
    :theaters="theaters" 
    :poster="poster"
    @showtime-selected="handleShowtimeSelected"
    :showDate="dates[selectedIndex]" 
    />
  </div>
</template>

<script>

import TheaterComponent from './TheaterComponent.vue';

export default {
  name: 'DateComponent',
  components: {TheaterComponent},
  props: ['theaters', 'poster'],
  data() {
    console.log('poster',this.poster);
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const monthsOfYear = [
      'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ];
    const dates = [];
    for (let i = 0; i < 6; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);
      dates.push({
        day: daysOfWeek[currentDate.getDay()],
        date: currentDate.getDate(),
        month: monthsOfYear[currentDate.getMonth()],
      });
    }

    return {
      dates,
      selectedIndex: 0,
    };
  },
  methods: {
    selectDate(index) {
      this.selectedIndex = index;
      this.$emit('date-selected', this.dates[index]);
    },
  },
};
</script>

<style scoped>
.date-display {
  display: flex;
  text-align: center;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
}
.date-item {
  margin: 0 10px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 5px;
  padding: 8px;
}
.date-item.selected {
  background-color: rgb(231, 6, 126);
  border-radius: 5px;
  color: white;
  padding: 8px;
}
.day {
  font-size: 1.5em;
  font-weight: bold;
}
.date {
  font-size: 1.2em;
}
</style>
