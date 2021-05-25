<template>
  <div>
    <spinner v-if="!showInformations" class="spinner"></spinner>
    <section v-else>
      <div class="boxcontainer movie">
        <h2>{{ showInformations.title }}</h2>
        <img class="poster" :src="showposterSrc" />

        <div class="showData">
          <div class="rateBox">
            <p class="baseInfo">
              TMDB rate:
              <span class="baseInfo__span">{{
                showInformations.vote_average
              }}</span>
            </p>
            <p class="baseInfo">Votes counted:</p>
            <span class="baseInfo__span">
              {{ showInformations.vote_count }}</span
            >
          </div>
          <div class="dateOfRealesed">
            <p class="baseInfo baseInfo--userRate">Date of realeased:</p>
            <span class="baseInfo__span">{{
              showInformations.release_date
            }}</span>
          </div>
        </div>
        <div class="overView">
          {{ showInformations.overview }}
        </div>
        <div class="additionalInfo">
          <p class="baseInfo">Your Rate:</p>
          <rate-form type="movie" :Id="showInformations.id"></rate-form>
          <div>
            <h4>Genres:</h4>
            <div class="genres__wrapper">
              <span
                class="genres__badge"
                v-for="genre in showInformations.genres"
                :key="genre['name']"
                >{{ genre.name }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    showInformations() {
      return this.$store.getters["ShowDetails/showInformations"];
    },
    showposterSrc() {
      if (this.showInformations.poster_path === null) {
        return require("../../../public/assets/img/posterPlaceholder.png");
      } else {
        return (
          "https://image.tmdb.org/t/p/w500" + this.showInformations.poster_path
        );
      }
    },
  },
  mounted() {
    if (this.$store.getters["ShowDetails/showInformations"] === null) {
      const movieID = this.$route.params.movieID;
      const payload = {
        typeOfShow: "movie",
        id: movieID,
      };
      this.$store.dispatch("ShowDetails/updateShowInformations", payload);
    }
  },
};
</script>

<style scoped>
.boxcontainer {
  padding: 3rem 0;
  border-radius: 20px;
  background-color: #292e2b;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.spinner {
  margin-top: 50%;
  text-align: center;
}

img {
  width: 100%;
}
.dateOfRealesed {
  width: 50%;
  display: flex;
  flex-direction: column;
}
.showData {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.lastEpisode {
  display: flex;
  align-items: center;
}
.lastEpisode__data {
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
}
.baseInfo--userRate {
  font-size: 1.7rem;
}
.poster {
  width: 90%;
  margin: 0 auto;
}

.seasonsInfo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}

.overView {
  margin: 2rem;
  font-size: 1.3rem;
  text-align: justify;
}
.rateBox {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.baseInfo {
  font-size: 1.5rem;
}
.baseInfo__span {
  color: var(--main-color);
  font-weight: 600;
  letter-spacing: 1px;
}

.additionalInfo {
  margin: 1rem;
  height: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
}
.genres__wrapper {
  margin: 0 auto;
  width: 90%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.genres__badge {
  margin: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  font-size: 1.5rem;
  background-color: black;
  color: var(--main-color);
  text-transform: uppercase;
}
h3 {
  color: black;
}
.form {
  margin: 0 auto;
}
</style>