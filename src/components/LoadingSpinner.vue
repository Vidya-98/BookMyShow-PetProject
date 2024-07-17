<template>
    <div class="spinner" v-if="loading">
      <div class="circle"></div>
    </div>
</template>

<script>
export default {
    name: 'LoadingSpinner',
    props: ['loading']
}
</script>

<style scoped>
.spinner {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.circle {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #333;
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
  border-color: #333 transparent transparent transparent;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
  