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
        <div class="scale">
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
      if (this.type === "person") {
        return;
      }

      // WHY you use store reset ?
      this.$store.dispatch("ShowDetails/updateShowInformations", null);

      const payload = {
        typeOfShow: this.type,
        id: this.id,
      };

      this.$store.dispatch("ShowDetails/updateShowInformations", payload);

      this.$router.push(`/${this.type}/${payload.id}`);
    },

    async fetchData() {
      console.log(this.type);
      const url = `https://api.themoviedb.org/3/${this.type}/${this.id}?api_key=b9e62fadaa93179070f235a9087033e2&language=en-US`;

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
            console.log(name.split("").length);
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