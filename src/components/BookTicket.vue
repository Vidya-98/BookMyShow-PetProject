<template>
 <div>
  <div>
    <TitleComponent 
    :movieId="movieId" /> 
  </div>
  
  <div>
    <DateComponent
     @date-selected="handleDateSelected"
    :theaters="theaters" 
    :poster="moviePosterPath" />
  </div>
  
 </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import DateComponent from './DateComponent.vue';
import TitleComponent from './TitleComponent.vue';
import theaterDetails from '../details.json';


export default {
  name: 'BookTicketComponent',
  components: {
    TitleComponent,
    DateComponent,
  
  },
  setup() {
    const route = useRoute();
    const movieId = route.params.id;
    const moviePosterPath = route.params.posterpath;
    const theaters = ref(theaterDetails);
    const selectedTheater = ref(null);
    const selectedShowtime = ref(null);
    const selectedDate = ref(null);
    const handleDateSelected = (selectDate) => {
      console.log('Selected dateeeeeeeeeee', selectDate);
      selectedDate.value = selectDate;
    };

    const handleShowtimeSelected = ({ theaterName, showtime }) => {
      selectedTheater.value = theaterName;
      selectedShowtime.value = showtime;
    };

    return {
      movieId,
      theaters,
      moviePosterPath,
      selectedTheater,
      selectedShowtime,
      selectedDate,
      handleDateSelected,
      handleShowtimeSelected,
    };
  },
};
</script>


