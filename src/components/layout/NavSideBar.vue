<template>
  <div @click="$emit('close-nav')"></div>
  <nav>
    <ul>
      <li><router-link to="/show">Details</router-link></li>
      <li>Movies</li>
      <li>TvShows</li>
      <li>Celebs</li>
    </ul>
  </nav>
</template>
<script>
export default {
  emits: ["close-nav"],
};
</script>

<style  scoped>
div {
  position: fixed;
  z-index: 2;
  height: 100vh;
  width: 100vw;
}

nav {
  position: fixed;
  background-color: #4c4d4f;
  width: 15rem;
  height: 40rem;
  top: 5.89rem;
  border-radius: 0 15px 15px 0;
  z-index: 10;
}
li {
  padding: 1rem 1.5rem;
  font-size: 1.5rem;
  color: White;
  text-align: center;
  border-bottom: 1px solid black;
}
</style>