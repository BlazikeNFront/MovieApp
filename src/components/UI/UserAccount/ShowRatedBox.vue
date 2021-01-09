<template>
  <div>
    <spinner v-if="!isLoading" class="spinner"></spinner>
    <div class="container" v-else>
      <img
        class="moviePoster"
        :src="posterSrc"
        alt="moviePoster"
        @click="updateDetailShowComponent"
      />
      <div>
        <h3>{{ title }}</h3>
        <div class="scale">
          <!--There is some sort of a bug(feature??) - cant give class directly to rate form component  (cuz of lifecycle hook being used[mounted]???)  -->
          <rate-form :type="type" :Id="id"></rate-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "type"],
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
    updateDetailShowComponent() {
      if (this.type === "actor") {
        return;
      }
      this.$store.dispatch("ShowDetails/updateShowInformations", null);
      const isMovie = this.type === "movie" ? true : false;
      const payload = {
        movie: isMovie,
        id: this.id,
      };
      this.$store.dispatch("ShowDetails/updateShowInformations", payload);
      const routeParam = payload.movie === true ? "movie" : "show";
      this.$router.push(`/${routeParam}/${payload.id}`);
    },

    async fetchData() {
      let url;
      switch (this.type) {
        case "movie":
          url = `https://api.themoviedb.org/3/movie/${this.id}?api_key=b9e62fadaa93179070f235a9087033e2&language=en-US`;
          break;
        case "tvShow":
          url = `https://api.themoviedb.org/3/tv/${this.id}?api_key=b9e62fadaa93179070f235a9087033e2&language=en-US`;
          break;
        case "actor":
          url = `https://api.themoviedb.org/3/person/${this.id}?api_key=b9e62fadaa93179070f235a9087033e2&language=en-US`;
          break;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          const error = new Error("SERVER SIDE ERROR");
          throw error;
        }
        const responseData = await response.json();

        if (this.type !== "actor") {
          const name = responseData.title || responseData.original_name;
          if (name.split("").length > 14) {
            this.title = name.split("").splice(0, 11).join("") + "...";
          } else {
            this.title = name;
          }

          this.posterSrc =
            "https://image.tmdb.org/t/p/w500" + responseData.poster_path;
        } else {
          const name = responseData.name;
          if (name.split("").length > 14) {
            this.title = name.split("").splice(0, 11).join("") + "...";
          } else {
            this.title = name;
          }

          this.posterSrc =
            "https://image.tmdb.org/t/p/w500" + responseData.profile_path;
        }
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