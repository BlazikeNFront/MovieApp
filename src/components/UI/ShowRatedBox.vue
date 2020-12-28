<template>
  <div class="box">
    <spinner v-if="!isLoading" class="spinner"></spinner>
    <div class="container" v-else>
      <div
        class="moviePoster"
        :style="{ backgroundImage: 'url(' + posterSrc + ')' }"
      ></div>
      <h3>{{ title }}</h3>
      <div class="scale">
        <!--There is some sort of a bug(feature??) - cant give class directly to rate form component  (cuz of lifecycle hook being used[mounted]???)  -->
        <rate-form :isM="isMovie" :Id="id" :rated="rate"></rate-form>
      </div>
    </div>
  </div>
</template>

<script>
import RateForm from "./RateForm.vue";
import Spinner from "./Spinner.vue";

export default {
  components: {
    RateForm,
    Spinner,
  },
  props: ["id", "isMovie", "rate"],
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      isLoading: true,
      title: null,
      posterSrc: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${this.id}?api_key=b9e62fadaa93179070f235a9087033e2&language=en-US`
        );
        const responseData = await response.json();
        this.title = responseData.title;
        this.posterSrc =
          "https://image.tmdb.org/t/p/w500" + responseData.poster_path;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 11rem;
  height: 20rem;
  padding-top: 0.5rem;
  box-shadow: 4px 10px 15px rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.spinner {
  margin: 35% auto;
  transform: scale(0.6);
}

.box {
  width: 11rem;
  height: 20rem;
  padding-top: 0.5rem;
  box-shadow: 4px 10px 15px rgba(0, 0, 0, 0.8);
  border-radius: 5px;
}

.moviePoster {
  width: 90%;
  height: 77%;
  background-color: coral;
  background-size: contain;
}
h3 {
  margin-top: 1rem;
}
.scale {
  transform: scale(0.6);
}
</style>