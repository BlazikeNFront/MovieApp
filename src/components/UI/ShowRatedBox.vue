<template>
  <div>
    <spinner v-if="!isLoading" class="spinner"></spinner>
    <div class="container" v-else>
      <img class="moviePoster" :src="posterSrc" alt="moviePoster" />
      <div>
        <h3>{{ title }}</h3>
        <div class="scale">
          <!--There is some sort of a bug(feature??) - cant give class directly to rate form component  (cuz of lifecycle hook being used[mounted]???)  -->
          <rate-form :isM="isMovie" :Id="id" :rated="rate"></rate-form>
        </div>
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
      let url = `https://api.themoviedb.org/3/movie/${this.id}?api_key=b9e62fadaa93179070f235a9087033e2&language=en-US`;
      if (!this.isMovie) {
        url = `https://api.themoviedb.org/3/tv/${this.id}?api_key=b9e62fadaa93179070f235a9087033e2&language=en-US`;
      }
      try {
        const response = await fetch(url);
        const responseData = await response.json();

        const name = responseData.title || responseData.original_name;
        if (name.split("").length > 14) {
          this.title = name.split("").splice(0, 11).join("") + "...";
        } else {
          this.title = name;
        }

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
  margin: 0 1rem;
  width: 11rem;
  height: 23rem;
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

.moviePoster {
  width: 90%;
  height: 73%;
  border-radius: 5px;
}
h3 {
  margin-top: 1rem;
  font-size: 1rem;
}
.scale {
  transform: scale(0.6);
}
</style>