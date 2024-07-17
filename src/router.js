import { createRouter, createWebHistory } from 'vue-router';
import MoviePage from './MoviePage.vue';
import ModalPage from './components/ModalComponent.vue';
import MovieDetailsPage from './MovieDetailsPage.vue';
import BookTicketComponent from './components/BookTicket.vue';
import TheaterComponent from './components/TheaterComponent.vue';
import SeatComponent from './components/SeatComponent.vue';
//import PaymentPage from './components/PaymentPage.vue';
import ReceiptListComponent from './components/ReceiptListComponent.vue';
import HistoryScreen from './HistoryScreen.vue';


const routes = [

  {
    path: '/',
    name: 'MoviePage',
    component: MoviePage
  },

  { path: '/movies', component: MoviePage },

  {path: '/modal', component: ModalPage},
  {
    path: '/movie/:id/:tab',
    name: 'MovieDetailsPage',
    component: MovieDetailsPage
  },
  {
    path: '/book-tickets/:id/:title/:posterpath',
      name: 'BookTicketComponent',
      component: BookTicketComponent,
      
  },
  {
    path: '/theater/:id/:title',
    name: 'TheaterComponent',
    component: TheaterComponent
  },
  {
    path: '/seat-selection/seatCategory',
    name: 'SeatComponent',
    component: SeatComponent
  },
  // {
  //   path: '/payment',
  //   name: 'PaymentPage',
  //   component: PaymentPage
  // }

  {
    path: '/history',
    name: 'HistoryScreen',
    component: HistoryScreen
  },
  {

  path: '/receipts',
  name: 'ReceiptList',
  component: ReceiptListComponent,

  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;