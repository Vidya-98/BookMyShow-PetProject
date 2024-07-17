<template>
  <div>
    <div class="cast-alignment">
      <div class="castdetails">
        <img :src="getProfileUrl(actorDetails.profile_path)" alt="Actor Image" />
      </div>
      <button class="delete-button" @click="deleteActor(actorDetails)">Delete</button>
      <h4>{{ actorDetails.name }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CastDetails',
  props: [
    'actorDetails'
],
  methods: {
    getProfileUrl(profilePath) {
      return `https://image.tmdb.org/t/p/w185${profilePath}`;
    },
    deleteActor() {
      this.$emit('deleteActor', this.actorDetails);
    }
  }
};
</script>
