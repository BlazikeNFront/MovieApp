<template>
  <section>
    <spinner v-if="!showInformations" class="spinner"></spinner>
    <div v-else class="boxcontainer tvShow">
      <img class="poster" :src="showposterSrc" />
      <div class="showData">
        <div class="rateBox">
          <p class="baseInfo">TMDB rate:</p>
          <span class="baseInfo__span">{{
            showInformations.vote_average
          }}</span>
          <p class="baseInfo">Total votes:</p>
          <span class="baseInfo__span">{{ showInformations.vote_count }}</span>
        </div>
        <div class="lastEpisode">
          <p class="baseInfo">Last episode :</p>
          <div class="lastEpisode__data">
            <span class="baseInfo__span">{{
              showInformations.last_episode_to_air.name
            }}</span>
            <p>{{ showInformations.last_episode_to_air.air_date }}</p>
          </div>
        </div>
      </div>

      <div class="overviewContainer">
        <p class="overview">{{ showInformations.overview }}</p>
      </div>
      <div class="rateForm">
        <p>Rate Show :</p>
        <rate-form type="tv" :Id="showInformations.id"></rate-form>
      </div>
      <div class="additionalInfo">
        <h4>Seasons:</h4>

        <div class="showCreators">
          <h4>Created by:</h4>
          <p v-for="creator in showInformations.created_by" :key="creator.id">
            {{ creator.name }}
          </p>
        </div>
        <div class="showHomePageContainer">
          <a :href="showInformations.homepage" target="_blank">
            Show Homepage
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  mounted() {
    if (this.$store.getters["ShowDetails/showInformations"] === null) {
      const movieID = this.$route.params.showID;
      const payload = {
        typeOfShow: "tv",
        id: movieID,
      };
      this.$store.dispatch("ShowDetails/updateShowInformations", payload);
    }
  },
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
};
</script>
<style scoped>
.spinner {
  margin-top: 50%;
  text-align: center;
}

.boxcontainer {
  padding: 3rem 0;
  background-color: #292e2b;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.poster {
  margin: 1rem auto;
  width: 90%;
  border-radius: 10px;
}

.showData {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.baseInfo {
  font-size: 1.5rem;
}
.baseInfo__span {
  font-size: 1.5rem;
  color: var(--main-color);
  font-weight: 400;
  letter-spacing: 1px;
}
.lastEpisode {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.lastEpisode__data {
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
}

.overviewContainer {
  margin: 2rem 1rem;
}
.overview {
  text-align: justify;
  font-size: 1.5rem;
}
.rateForm {
  height: 10rem;
}

.additionalInfo {
  margin: 1rem;
  text-align: center;
}

.form {
  margin: 0 auto;
}
button {
  margin: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: var(--main-color);
  font-family: inherit;
  font-size: 2rem;
}
.showCreators {
  margin: 1rem;
}
p {
  font-size: 1.5rem;
}
.showHomePageContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
a {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
}
</style>