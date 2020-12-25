<template>
  <section>
    <div class="loader" v-if="!showInformations"></div>
    <div v-else>
      <div class="boxcontainer movie" v-if="movie">
        <img
          class="poster"
          :src="
            'https://image.tmdb.org/t/p/w500' + showInformations.poster_path
          "
        />
        <h2>{{ showInformations.title }}</h2>
        <div class="showData">
          <div class="rate">
            <p class="rate">TMDB rate: {{ showInformations.vote_average }}</p>
            <p class="voteCounted">
              Vote counted: {{ showInformations.vote_count }}
            </p>
          </div>
          <div class="dateOfRealesed">
            <p>
              Date of realeased:
              {{ showInformations.release_date }}
            </p>
          </div>
        </div>
        <div class="overView">
          {{ showInformations.overview }}
        </div>
        <div class="additionalInfo">
          <p>Your Rate:</p>
          <rate-form
            class="form"
            :isM="true"
            :Id="showInformations.id"
          ></rate-form>
          <div class="genre">
            <h4>Genres:</h4>
            <p
              class="genres"
              v-for="genre in showInformations.genres"
              :key="genre['name']"
            >
              {{ genre.name }}
            </p>
          </div>
        </div>
      </div>

      <div class="boxcontainer tvShow" v-else>
        <img
          class="poster"
          :src="
            'https://image.tmdb.org/t/p/w500' + showInformations.poster_path
          "
        />
        <div class="showData">
          <div class="rate">
            <p class="rate">TMDB rate: {{ showInformations.vote_average }}</p>
            <p class="voteCounted">
              Vote counted: {{ showInformations.vote_count }}
            </p>
          </div>
          <div class="lastEpisode">
            <p>Last episode</p>
            <div class="lastEpisode__data">
              <p>{{ showInformations.last_episode_to_air.name }}</p>
              <p>{{ showInformations.last_episode_to_air.air_date }}</p>
            </div>
          </div>
        </div>
        <div class="overView">
          {{ showInformations.overview }}
        </div>
        <rate-form
          class="form"
          :isM="false"
          :Id="showInformations.id"
        ></rate-form>
        <div class="additionalInfo">
          <h4>Seasons:</h4>
          <div class="seasonsInfo">
            <button
              v-for="season in showInformations['seasons']"
              :key="season.name"
            >
              {{ season.name }}
            </button>
          </div>
          <div class="showCreators">
            <h4>Created by:</h4>
            <p v-for="creator in showInformations.created_by" :key="creator.id">
              {{ creator.name }}
            </p>
          </div>
          <p>Homepage:{{ showInformations.homepage }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import RateForm from "../components/UI/RateForm.vue";

export default {
  components: {
    RateForm,
  },

  data() {
    return {
      showInformations: null,
      movie: null,
    };
  },

  computed: {
    showInfo() {
      return this.$store.getters["ShowDetails/showInformations"];
    },
  },
  watch: {
    showInfo(newVal) {
      this.showInformations = newVal;
      this.movie = !!newVal.release_date;
    },
  },
};
</script>
<style  scoped>
section {
  margin-top: 4rem;
}

.boxcontainer {
  display: flex;
  flex-direction: column;
  background-color: #292e2b;
  padding: 3rem 0;
  text-align: center;
}

img {
  width: 100%;
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
  margin: 2rem 1rem;
}
.rate {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.additionalInfo {
  margin: 1rem;
  text-align: center;
}

h3 {
  color: black;
}
.form {
  margin: 0 auto;
}
</style>
