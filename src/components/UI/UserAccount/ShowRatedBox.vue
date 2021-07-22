<template>
  <div>
    <spinner v-if="!isLoading" class="spinner scale"></spinner>
    <div class="container" v-else>
      <img
        class="moviePoster"
        :src="posterSrc"
        alt="moviePoster"
        @click="updateDetailShowComponent"
      />
      <div>
        <h3>{{ title }}</h3>
        <div class="rate">
          <rate-form :type="type" :Id="id" :isRated="true"></rate-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { movieDBAPIKey } from "../../../../privates.js";
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
      if (this.type === "person") {
        return;
      }

      this.$store.dispatch("ShowDetails/updateShowInformations", null);

      const payload = {
        typeOfShow: this.type,
        id: this.id,
      };

      this.$store.dispatch("ShowDetails/updateShowInformations", payload);

      this.$router.push(`/${this.type}/${payload.id}`);
    },

    async fetchData() {
      const url = `https://api.themoviedb.org/3/${this.type}/${this.id}?api_key=${movieDBAPIKey}&language=en-US`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          const error = new Error("SERVER SIDE ERROR");
          throw error;
        }
        const responseData = await response.json();

        if (this.type !== "person") {
          const name = responseData.title || responseData.original_name;

          if (name.split("").length > 16) {
            this.title = name.split("").splice(0, 10).join("") + "...";
          } else {
            this.title = name;
          }

          this.posterSrc =
            "https://image.tmdb.org/t/p/w500" + responseData.poster_path;
        } else {
          const name = responseData.name;
          if (name.split("").length > 14) {
            this.title = name.split("").splice(0, 10).join("") + "...";
          } else {
            this.title = name;
          }

          this.posterSrc =
            "https://image.tmdb.org/t/p/w500" + responseData.profile_path;
        }
      } catch (err) {
        this.$store.dispatch("ErrorModa/toggleErrorModal");
        this.$store.dispatch(
          "ErrorModal/setErrorMessage",
          "Couldn't get data about show :( Try again Later"
        );
      }
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
  margin: 0 1rem;
  padding: 1rem 0;
  width: 18rem;
  height: fit-content;
  box-shadow: 4px 10px 15px rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.spinner {
  margin: 35% auto;
}

.moviePoster {
  width: 90%;
  height: 25rem;
  border-radius: 5px;
}
h3 {
  margin-top: 1rem;
  font-size: 1.5rem;
}
.rate {
  transform: scale(0.8);
}
</style>